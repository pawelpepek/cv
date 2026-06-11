import { computed, Injectable, signal } from '@angular/core';
import type { Firestore } from 'firebase/firestore';
import { environment } from '../../environment/environment';
import { PHONE_COUNTRY_CODE } from '../models/phone';

const PHONE_STORAGE_KEY = 'phone';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  phone = signal<string>('');

  displayedPhone = computed(() => this.phone() ? this.phone() : '000 000 000');
  hrefPhone = computed(() => this.phone() ? `tel:${PHONE_COUNTRY_CODE}${this.phone().replace(/\s+/g, '')}` : undefined);
  hasPhone = computed(() => !!this.phone());

  // The Firebase SDK is loaded lazily, only when a ?key= is present —
  // most visitors never download it.
  private firestore?: Promise<Firestore>;

  constructor() {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const phoneFromStorage = localStorage.getItem(PHONE_STORAGE_KEY);
    if (phoneFromStorage) {
      this.phone.set(phoneFromStorage);
    }
  }

  async loadPhone(key: string) {
    if (this.phone()) {
      return;
    }

    try {
      const [firestore, { doc, getDoc }] = await Promise.all([
        this.initFirestore(),
        import('firebase/firestore'),
      ]);

      const snapshot = await getDoc(doc(firestore, 'contacts', key));
      const phone = snapshot.data()?.['phone'];

      if (phone) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(PHONE_STORAGE_KEY, phone);
        }
        this.phone.set(phone);
      }
    } catch {
      // Invalid key, network failure or App Check rejection — keep the placeholder.
    }
  }

  private initFirestore(): Promise<Firestore> {
    this.firestore ??= (async () => {
      const [{ initializeApp }, { initializeAppCheck, ReCaptchaV3Provider }, { getFirestore }] =
        await Promise.all([
          import('firebase/app'),
          import('firebase/app-check'),
          import('firebase/firestore'),
        ]);

      const app = initializeApp({
        projectId: 'cvpp-2bfc2',
        appId: '1:911715717728:web:59a9c1ccff73217da52905',
        storageBucket: 'cvpp-2bfc2.firebasestorage.app',
        apiKey: environment.firebaseApiKey,
        authDomain: 'cvpp-2bfc2.firebaseapp.com',
        messagingSenderId: '911715717728',
      });

      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(environment.reCaptchaKey),
        isTokenAutoRefreshEnabled: true,
      });

      return getFirestore(app);
    })();

    return this.firestore;
  }
}
