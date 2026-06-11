import { computed, inject, Injectable, signal } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

const PHONE_STORAGE_KEY = 'phone';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  phone = signal<string>('');

  displayedPhone = computed(() => this.phone() ? this.phone() : '000 000 000');
  hrefPhone = computed(() => this.phone() ? `tel:(+48) ${this.phone()}` : "");
  hasFullAccess = computed(() => !!this.phone());

  private readonly firestore = inject(Firestore);

  constructor() {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const phoneFromStorage = localStorage.getItem(PHONE_STORAGE_KEY);
    if (phoneFromStorage) {
      this.phone.set(phoneFromStorage);
    }
  }

  loadPhone(key: string) {
    if (this.phone()) {
      return;
    }

    getDoc(doc(this.firestore, 'contacts', key)).then(snapshot => {
      const phone = snapshot.data()?.['phone'];

      if (phone) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(PHONE_STORAGE_KEY, phone);
        }
        this.phone.set(phone);
      }
    }).catch(() => {
      // Invalid key, network failure or App Check rejection — keep the placeholder.
    });
  }
}
