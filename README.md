# CV

## [DEMO](https://cvpp-2bfc2.web.app/?highlight=.net,angular&exclude=ASP.NET)

## What did I use?
- Angular Signals (removed zone.js)
- Tailwind
- Firebase Hosting
- Firestore
- Firebase App Check
- Font Awesome
- Google Fonts

## URL parameters

- `?highlight=.net,angular,sql` — comma-separated terms bolded (case-insensitive, whole words) wherever they appear in the CV.
- `?exclude=.NET Framework/Core` — comma-separated phrases excluded from bolding; a highlighted term inside an excluded phrase stays unbolded (e.g. `?highlight=.net&exclude=.NET Framework/Core` bolds standalone ".NET" but not the one inside ".NET Framework/Core").
- `?lang=pln|eng` — language toggle (default is Polish).
- `?key=...` — secret document ID revealing the phone number (see below).

I don't want my phone number to be public on the web, so I've stored it in the Firestore database.
It is revealed only when the URL carries the secret document ID (`?key=...`). Reads are locked down with
Firestore security rules (`get` by exact ID only, no listing) and protected by App Check (reCAPTCHA v3).
