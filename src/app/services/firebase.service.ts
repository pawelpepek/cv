import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, DocumentData, Firestore, getDocs, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { decryptData } from './crypto';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  phone = signal<string>('');

  displayedPhone = computed(() => this.phone() ? this.phone() : '000 000 000');
  hrefPhone = computed(() => this.phone() ? `tel:(+48) ${this.phone()}` : "");
  hasFullAccess = computed(() => !!this.phone());

  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  constructor() {
    const phoneFromStorage = localStorage.getItem('phone');
    if (phoneFromStorage) {
      this.phone.set(phoneFromStorage);
    }
  }

  login(c1: string, c2: string) {
    const email = decryptData(c1);
    const password = decryptData(c2);

    if (this.phone()) {
      return;
    }

    signInWithEmailAndPassword(this.auth, email, password).then(
      () => {
        const colRef = collection(this.firestore, 'data');
        getDocs(colRef).then(snapshot => snapshot.docs.map(doc => this.setPhone(doc)));
      }
    )
  }

  private setPhone(doc: QueryDocumentSnapshot<DocumentData, DocumentData>) {
    const phone = doc.data()?.['phone']

    if (phone) {
      localStorage.setItem("phone", phone);
      this.phone.set(phone);
    }
  }
}