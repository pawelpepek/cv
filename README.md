# CV

## [DEMO](https://cvpp-2bfc2.web.app/?highlight=.net,angular,sql)

## What did I use?
- Angular Signals (removed zone.js)
- Tailwind
- Firebase Hosting
- Firestore
- Firebase App Check
- Font Awesome
- Google Fonts

I don't want my phone number to be public on the web, so I've stored it in the Firestore database.
It is revealed only when the URL carries the secret document ID (`?key=...`). Reads are locked down with
Firestore security rules (`get` by exact ID only, no listing) and protected by App Check (reCAPTCHA v3).
