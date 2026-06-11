# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page Angular 22 CV/résumé app, deployed to Firebase Hosting. The phone number is kept out of the source and revealed only when the URL carries a secret Firestore document ID (see "Private data (phone)" below).

## Commands

- `npm start` — dev server (`ng serve`) at http://localhost:4200
- `npm run build` — production build to `dist/cv/browser`, **statically prerendered** (see "Prerendering" below)
- `npm run watch` — incremental dev build
- `npm test` — unit tests, single run (**vitest** + jsdom via the `@angular/build:unit-test` builder — not Karma/Jasmine). Specs live next to their sources (services, `app.component.spec.ts`, `localized.spec.ts`).
- `npm run test:watch` — tests in watch mode
- `npm run e2e` — Playwright tests in [e2e/](e2e/) (also runs in CI). Three groups: smoke ([smoke.spec.ts](e2e/smoke.spec.ts)) and axe a11y audit ([a11y.spec.ts](e2e/a11y.spec.ts), WCAG A/AA) run against `ng serve` on **chromium and webkit** (Safari engine — run `npx playwright install webkit` once locally); prerender tests ([prerender.spec.ts](e2e/prerender.spec.ts), chromium only — they assert on raw HTML, the engine doesn't matter) assert on the raw static build served by [e2e/serve-dist.mjs](e2e/serve-dist.mjs) (port 4201; auto-builds when `dist/` is missing, otherwise serves the **last** build — rerun `npm run build` after source changes). Both servers start via `webServer` in [playwright.config.ts](playwright.config.ts).
- `npm run lint` — ESLint via angular-eslint (flat config in [eslint.config.js](eslint.config.js); also runs in CI)
- `npm run deploy` — builds then `firebase deploy` (Firebase project `cvpp-2bfc2`; deploys hosting **and** Firestore rules)

Run a single spec file: `ng test --include='**/<name>.spec.ts'`.

## Dependency notes (read before touching package.json)

The stack is **Angular 22 + Tailwind 4 + TypeScript ~6.0** (Node ≥ 22.22.3 required by the Angular CLI). A few notes:

- **No AngularFire.** The plain `firebase` JS SDK is used directly and **lazy-loaded** via dynamic `import()` in [firebase.service.ts](src/app/services/firebase.service.ts) — do not add `@angular/fire` back (it would pin the Angular major and pull Firebase into the initial bundle).
- Plain `npm install` works (no `--legacy-peer-deps` needed since AngularFire was removed).
- Tailwind 4 is wired via [.postcssrc.json](.postcssrc.json) (`@tailwindcss/postcss`) and `@import "tailwindcss"` in `src/styles.css` — not `@tailwind` directives. There is no `tailwind.config.js` (not needed in v4) and no Sass — global styles are plain CSS.
- `@angular/ssr` + `@angular/platform-server` are used **only for build-time prerendering** (static output); `express` is not a dependency and must not become one.

## Architecture

- **Zoneless, signal-based.** `provideZonelessChangeDetection()` is set in [app.config.ts](src/app/app.config.ts) — zone.js is removed. Use Angular **signals** / `computed()` for all reactive state; do not rely on zone-triggered change detection. Services hold state as signals (e.g. `FirebaseService.phone`, `BoldService.bold`, `LanguageService.language`). Components use Angular 22's default `ChangeDetectionStrategy.OnPush` (no explicit `changeDetection` anywhere — lint forbids opting out); template state must come from signals.
- **Standalone components only.** No NgModules. Each component declares its own `imports`. Routes in [app.routes.ts](src/app/app.routes.ts): `''` → `CvComponent`, `certificates` → `CertificatesComponent`.
- **Layout.** `CvComponent` composes `LeftPartComponent` (about-me, work-experience, projects, footer) and `RightPartComponent` (personal-info, education), plus a language toggle. Many small reusable presentational components live under [src/app/components/shared/](src/app/components/shared/) (icons, lists, links, bolding).
- **Content lives in TypeScript, not a CMS.** Résumé data is exported as typed constants alongside the model interfaces in [src/app/models/](src/app/models/) — e.g. `PROJECTS` in [project.ts](src/app/models/project.ts), `EXPERIENCES` in [experience.ts](src/app/models/experience.ts), `ABOUT_ME` in [translatable-info.ts](src/app/models/translatable-info.ts), `SKILLS`/`PROFILE_INFO`/`ADDITIONAL_INFO` in [icon-text-item.ts](src/app/models/icon-text-item.ts). To edit CV content, edit these constants.

## Prerendering (static SSG)

The production build prerenders both routes to static HTML at build time (`outputMode: "static"` in [angular.json](angular.json) + [src/main.server.ts](src/main.server.ts) + [app.config.server.ts](src/app/app.config.server.ts) + [app.routes.server.ts](src/app/app.routes.server.ts)). There is **no Node server in production** — Firebase Hosting serves `index.html` and `certificates/index.html` as plain files; the SPA rewrite stays as a fallback.

- The prerendered HTML is the **default state**: Polish, placeholder phone, "Preview" watermark. Query-param features (`?lang`, `?highlight`, `?key`…) apply client-side after bootstrap, as before.
- **No hydration** (`provideClientHydration` is deliberately absent): the client re-renders destructively, which avoids hydration-mismatch risk when query params change the initial content. Don't add it without handling that.
- Browser globals in services must stay guarded (`typeof localStorage === 'undefined'`) — prerendering executes the app in Node. The Firebase SDK is never loaded during prerender (no `?key=`).
- The `@grpc/*` CommonJS build warnings come from bundling Firestore's Node entry for the server build; they're harmless (the server bundle isn't shipped).

## Bilingual (PL/EN) content

There is **one** translation mechanism: the [Localized<T>](src/app/models/localized.ts) type, which is either a plain `T` (same in both languages) or a `{ pl, en }` pair. Resolve it with [`LanguageService.localize()`](src/app/services/language.service.ts), always inside a `computed()` so it reacts to the language signal (a pure pipe would not, under zoneless change detection).

- Data models use `Localized` on translatable fields only; structural fields (icons, ids, `href`, `sector`) stay plain. Universal text stays a plain string — no duplicated entries.
- Section headers are `Localized` constants in one place: [SECTION_TITLES](src/app/models/section-titles.ts).
- `Language` enum is just `polish | english` ([language.ts](src/app/models/language.ts)). Language is driven by the `?lang=pl|en` query param (legacy `pln`/`eng` values are still accepted so old links keep working); `LanguageService.toggle()` flips it (preserving other params) and emits the ISO codes. Default is Polish.

(There is no `translate` pipe and no `Translatable`/`filter`/`find` mechanism — those were removed in favor of `Localized`.)

## Query-param driven features

`AppComponent.ngOnInit` ([app.component.ts](src/app/app.component.ts)) reads query params on every navigation:

- `?highlight=.net,angular,sql` — comma-separated terms fed to `BoldService.bold`. [BoldService](src/app/services/bold.service.ts) word-boundary-matches these (case-insensitive, regex-escaped so terms are literal) and bolds them inline anywhere they appear.
- `?exclude=.NET Framework/Core` — comma-separated phrases fed to `BoldService.exclude`; highlight matches falling inside an occurrence of an excluded phrase (case-insensitive) stay unbolded. Phrases cannot contain commas (same limitation as `highlight`).
- `?lang=pl|en` — sets language (legacy `pln`/`eng` also accepted); a missing or invalid value resets to the default (Polish).
- `?key=<firestore-doc-id>` — triggers the phone lookup (see below).

## Private data (phone)

The phone number is not in the source. Flow ([firebase.service.ts](src/app/services/firebase.service.ts)):

1. `?key=<id>` is read as a **Firestore document ID** (the secret — an unguessable ~20-char auto-ID).
2. The Firebase SDK (app + App Check + Firestore) is **lazy-loaded and initialized on first use** — only visitors with a `?key=` ever download it; there are no Firebase providers in `app.config.ts`.
3. `getDoc(doc(firestore, 'contacts', key))` reads the `phone` field. There is no auth, no AES, no shared password in the bundle.
4. Phone is cached in `localStorage` and exposed via signals (`displayedPhone`, `hrefPhone`, `hasPhone`). Without it, a placeholder `000 000 000` shows. A visit with `?key=` always re-queries Firestore — if the document now holds a different number the cache is refreshed, so a changed number propagates to anyone who follows their link again; a failed lookup keeps the cached value.

**Conscious decision:** once revealed, the phone stays cached on the visitor's device permanently (no TTL — do not add one). Deleting the Firestore document does *not* retract it from devices that already loaded it; that trade-off is accepted.

Security relies on: an unguessable document ID + Firestore rules that allow `get` (by exact ID) but deny `list`/`write` ([firestore.rules](firestore.rules), versioned in repo) + **App Check** (reCAPTCHA v3, configured alongside the lazy Firebase init in [firebase.service.ts](src/app/services/firebase.service.ts)). App Check enforcement for Firestore must be enabled in the Firebase console; on `localhost` it needs a registered debug token. The Firebase config, collection (`contacts`) and field (`phone`) names are hard-coded in `firebase.service.ts`.

## Configuration & secrets

- [src/environment/environment.ts](src/environment/environment.ts) holds `firebaseApiKey` and `reCaptchaKey` (both public by nature). It is **git-ignored** (see [.claudeignore](.claudeignore)) — when adding env-dependent code, expect this file to be absent in fresh checkouts.
- Styling is **Tailwind 4** via PostCSS, with global styles in `src/styles.css` (plain CSS, no Sass).
- Firebase config lives in [firebase.json](firebase.json): SPA hosting rewrite to `index.html` + `firestore.rules`.
