# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page Angular 20 CV/résumé app, deployed to Firebase Hosting. The phone number is kept out of the source and revealed only when the URL carries a secret Firestore document ID (see "Private data (phone)" below).

## Commands

- `npm start` — dev server (`ng serve`) at http://localhost:4200
- `npm run build` — production build to `dist/cv/browser`
- `npm run watch` — incremental dev build
- `npm test` — Karma + Jasmine unit tests (Chrome). There are currently no `.spec.ts` files in `src`, so this runs nothing meaningful yet.
- `npm run deploy` — builds then `firebase deploy` (Firebase project `cvpp-2bfc2`; deploys hosting **and** Firestore rules)

Run a single test (once specs exist): `ng test --include='**/<name>.component.spec.ts'`.

## Dependency notes (read before touching package.json)

The stack is **Angular 20 + Tailwind 4 + TypeScript ~5.8**. A few constraints are easy to trip over:

- **AngularFire pins the Angular major.** `@angular/fire@20` has a peer of `@angular/core@^20`, and there is no AngularFire release for Angular 21 — so the whole `@angular/*` stack is held at 20.
- Install with `npm install --legacy-peer-deps`. `@fortawesome/angular-fontawesome` is declared but **not imported anywhere** (icons are Material Symbols / SVG / CSS), so its version is cosmetic.
- Tailwind 4 is wired via [.postcssrc.json](.postcssrc.json) (`@tailwindcss/postcss`) and `@import "tailwindcss"` in `src/styles.scss` — not `@tailwind` directives. `tailwind.config.js` is a leftover v3-style stub and is effectively unused.

## Architecture

- **Zoneless, signal-based.** `provideZonelessChangeDetection()` is set in [app.config.ts](src/app/app.config.ts) — zone.js is removed. Use Angular **signals** / `computed()` for all reactive state; do not rely on zone-triggered change detection. Services hold state as signals (e.g. `FirebaseService.phone`, `BoldService.bold`, `LanguageService.language`).
- **Standalone components only.** No NgModules. Each component declares its own `imports`. Routes in [app.routes.ts](src/app/app.routes.ts): `''` → `CvComponent`, `certificates` → `CertificatesComponent`.
- **Layout.** `CvComponent` composes `LeftPartComponent` (about-me, work-experience, projects, footer) and `RightPartComponent` (personal-info, education), plus a language toggle. Many small reusable presentational components live under [src/app/components/shared/](src/app/components/shared/) (icons, lists, links, bolding).
- **Content lives in TypeScript, not a CMS.** Résumé data is exported as typed constants alongside the model interfaces in [src/app/models/](src/app/models/) — e.g. `PROJECTS` in [project.ts](src/app/models/project.ts), `EXPERIENCES` in [experience.ts](src/app/models/experience.ts), `ABOUT_ME` in [translatable-info.ts](src/app/models/translatable-info.ts), `SKILLS`/`PROFILE_INFO`/`ADDITIONAL_INFO` in [icon-text-item.ts](src/app/models/icon-text-item.ts). To edit CV content, edit these constants.

## Bilingual (PL/EN) content

There is **one** translation mechanism: the [Localized<T>](src/app/models/localized.ts) type, which is either a plain `T` (same in both languages) or a `{ pl, en }` pair. Resolve it with [`LanguageService.localize()`](src/app/services/language.service.ts), always inside a `computed()` so it reacts to the language signal (a pure pipe would not, under zoneless change detection).

- Data models use `Localized` on translatable fields only; structural fields (icons, ids, `href`, `sector`) stay plain. Universal text stays a plain string — no duplicated entries.
- Section headers are `Localized` constants in one place: [SECTION_TITLES](src/app/models/section-titles.ts).
- `Language` enum is just `polish | english` ([language.ts](src/app/models/language.ts)). Language is driven by the `?lang=pln|eng` query param; `LanguageService.toggle()` flips it (preserving other params). Default is Polish.

(There is no `translate` pipe and no `Translatable`/`filter`/`find` mechanism — those were removed in favor of `Localized`.)

## Query-param driven features

`AppComponent.ngOnInit` ([app.component.ts](src/app/app.component.ts)) reads query params on every navigation:

- `?highlight=.net,angular,sql` — comma-separated terms fed to `BoldService.bold`. [BoldService](src/app/services/bold.service.ts) word-boundary-matches these (case-insensitive, regex-escaped so terms are literal) and bolds them inline anywhere they appear.
- `?exclude=.NET Framework/Core` — comma-separated phrases fed to `BoldService.exclude`; highlight matches falling inside an occurrence of an excluded phrase (case-insensitive) stay unbolded. Phrases cannot contain commas (same limitation as `highlight`).
- `?lang=pln|eng` — sets language.
- `?key=<firestore-doc-id>` — triggers the phone lookup (see below).

## Private data (phone)

The phone number is not in the source. Flow ([firebase.service.ts](src/app/services/firebase.service.ts)):

1. `?key=<id>` is read as a **Firestore document ID** (the secret — an unguessable ~20-char auto-ID).
2. `getDoc(doc(firestore, 'contacts', key))` reads the `phone` field. There is no auth, no AES, no shared password in the bundle.
3. Phone is cached in `localStorage` and exposed via signals (`displayedPhone`, `hrefPhone`, `hasFullAccess`). Without it, a placeholder `000 000 000` shows.

Security relies on: an unguessable document ID + Firestore rules that allow `get` (by exact ID) but deny `list`/`write` ([firestore.rules](firestore.rules), versioned in repo) + **App Check** (reCAPTCHA v3, configured in [app.config.ts](src/app/app.config.ts)). App Check enforcement for Firestore must be enabled in the Firebase console; on `localhost` it needs a registered debug token. The collection (`contacts`) and field (`phone`) names are hard-coded in `firebase.service.ts`.

## Configuration & secrets

- [src/environment/environment.ts](src/environment/environment.ts) holds `firebaseApiKey` and `reCaptchaKey` (both public by nature). It is **git-ignored** (see [.claudeignore](.claudeignore)) — when adding env-dependent code, expect this file to be absent in fresh checkouts.
- Styling is **Tailwind 4** via PostCSS, with global SCSS in `src/styles.scss`.
- Firebase config lives in [firebase.json](firebase.json): SPA hosting rewrite to `index.html` + `firestore.rules`.
