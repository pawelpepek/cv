# Repository Guidelines

## Project Structure & Module Organization

Keep the repository easy to navigate. Place application source in the existing source directories, static files (images, fonts, and downloadable documents) with the project assets, and generated output only in directories already designated for it. Do not commit local editor settings, dependency caches, or build artefacts unless the project explicitly tracks them. When adding a feature, keep its related markup, styles, scripts, and assets close together where the current structure permits.

## Build, Test, and Development Commands

Before changing code, inspect the root-level project files to identify the supported workflow (for example, `package.json`, a `Makefile`, or framework configuration). Run commands through the repository’s declared package scripts rather than ad-hoc global tools:

```powershell
npm install       # install declared JavaScript dependencies, if package.json exists
npm run dev       # start the local development server, when provided
npm run build     # create the production build, when provided
npm test          # run the configured test suite, when provided
```

Use the package manager indicated by the lockfile; do not introduce a second lockfile.

## Coding Style & Naming Conventions

Follow the formatting, linting, and language conventions already present in nearby files. Prefer descriptive, lowercase, hyphen-separated names for files and assets (for example, `contact-section.css` and `profile-photo.webp`). Keep indentation and quote style consistent within each file. Make small, focused changes; avoid unrelated reformatting. If lint or format scripts are available, run them before submitting work.

## Testing Guidelines

Add or update tests when the repository contains a test framework and the change affects behavior. Name tests after the outcome they verify, such as `renders-contact-details` or `formats-date-range`. For visual or content-heavy changes, check the relevant page locally at common desktop and mobile widths and verify links, downloads, and image paths.

## Commit & Pull Request Guidelines

Write short, imperative commit subjects that describe one change, such as `Add Polish language contact details`. Keep commits scoped and include only intentional files. Pull requests should explain the user-visible change, note validation performed, link the related issue when applicable, and include screenshots for layout or styling changes. Call out any configuration, asset, or deployment follow-up needed by reviewers.
