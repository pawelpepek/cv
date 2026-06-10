# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page Angular 19 CV/résumé app, deployed to Firebase Hosting. The phone number is kept private in Firestore and only revealed after authenticating via encrypted query params (see "Auth & private data" below).

## Commands

- `npm start` — dev server (`ng serve`) at http://localhost:4200
- `npm run build` — production build to `dist/cv/browser`
- `npm run watch` — incremental dev build
- `npm test` — Karma + Jasmine unit tests (Chrome). There are currently no `.spec.ts` files in `src`, so this runs nothing meaningful yet.
- `npm run deploy` — builds then `firebase deploy` (Firebase project `cvpp-2bfc2`)

Run a single test (once specs exist): `ng test --include='**/<name>.component.spec.ts'`.

## Architecture

- **Zoneless, signal-based.** `provideZonelessChangeDetection()` is set in [app.config.ts](src/app/app.config.ts) — zone.js is removed. Use Angular **signals** / `computed()` for all reactive state; do not rely on zone-triggered change detection. Services hold state as signals (e.g. `FirebaseService.phone`, `BoldService.bold`, `LanguageService.language`).
- **Standalone components only.** No NgModules. Each component declares its own `imports`. Routes in [app.routes.ts](src/app/app.routes.ts): `''` → `CvComponent`, `certificates` → `CertificatesComponent`.
- **Layout.** `CvComponent` composes `LeftPartComponent` (about-me, work-experience, projects, footer) and `RightPartComponent` (personal-info, education), plus a language toggle. Many small reusable presentational components live under [src/app/components/shared/](src/app/components/shared/) (icons, lists, links, bolding).
- **Content lives in TypeScript, not a CMS.** Résumé data is exported as typed constant arrays alongside the model interfaces in [src/app/models/](src/app/models/) — e.g. `PROJECTS` in [project.ts](src/app/models/project.ts), `ABOUT_ME` in [translatable-info.ts](src/app/models/translatable-info.ts), plus `experience.ts`, `education.ts`. To edit CV content, edit these constants.

## Bilingual (PL/EN) content

The site is Polish/English. Two mechanisms:

1. **Data-level translation.** Models extend `Translatable` (`{ language?: Language }`). `Language` enum: `universal | polish | english` ([language.ts](src/app/models/language.ts)). Data arrays contain both PL and EN entries; [LanguageService](src/app/services/language.service.ts) `.filter()` / `.find()` select the right ones based on the current `language` signal. `universal`/undefined entries always show.
2. **Static UI strings.** Fixed section headers are translated via the `translate` pipe ([translate.pipe.ts](src/app/pipes/translate.pipe.ts)), backed by a hard-coded PL→EN `Map`. Add new header strings there.

Language is driven by the `?lang=pln|eng` query param; `LanguageService.toggle()` navigates to flip it (preserving other params). Default is Polish.

## Query-param driven features

`AppComponent.ngOnInit` ([app.component.ts](src/app/app.component.ts)) reads query params on every navigation:

- `?highlight=.net,angular,sql` — comma-separated terms fed to `BoldService.bold`. [BoldService](src/app/services/bold.service.ts) word-boundary-matches these (case-insensitive) and bolds them inline anywhere they appear.
- `?lang=pln|eng` — sets language.
- `?c1=<enc>&c2=<enc>` — encrypted credentials that trigger login (see below).

## Auth & private data

The phone number is not in the source. Flow ([firebase.service.ts](src/app/services/firebase.service.ts)):

1. `c1`/`c2` query params are AES-decrypted ([crypto.ts](src/app/services/crypto.ts), `crypto-js`) into a Firebase email/password.
2. `signInWithEmailAndPassword`, then read the `data` Firestore collection to get `phone`.
3. Phone is cached in `localStorage` and exposed via signals (`displayedPhone`, `hrefPhone`, `hasFullAccess`). Without it, a placeholder `000 000 000` shows.

Firebase **App Check** (reCAPTCHA v3) is enabled in [app.config.ts](src/app/app.config.ts) and gates Firestore/Auth requests.

## Configuration & secrets

- [src/environment/environment.ts](src/environment/environment.ts) holds `firebaseApiKey`, `secretKey` (AES key), and `reCaptchaKey`. It is **git-ignored** (see [.claudeignore](.claudeignore)) — when adding env-dependent code, expect this file to be absent in fresh checkouts.
- Styling is **Tailwind** ([tailwind.config.js](tailwind.config.js)) via PostCSS, with global SCSS in `src/styles.scss`. Icons via Font Awesome.
- Hosting is SPA-rewritten to `index.html` ([firebase.json](firebase.json)).
