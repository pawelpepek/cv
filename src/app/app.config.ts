import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environment/environment';
import { initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => {
      const app = initializeApp(
        {
          "projectId": "cvpp-2bfc2",
          "appId": "1:911715717728:web:59a9c1ccff73217da52905",
          "storageBucket": "cvpp-2bfc2.firebasestorage.app",
          "apiKey": environment.firebaseApiKey,
          "authDomain": "cvpp-2bfc2.firebaseapp.com",
          "messagingSenderId": "911715717728",
          "measurementId": "G-6FKGGQ7B5W"
        })

      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(environment.reCaptchaKey),
        isTokenAutoRefreshEnabled: true,
      })
      return app;
    }
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
