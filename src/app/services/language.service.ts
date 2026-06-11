import { computed, DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import { Language } from '../models/language';
import { Localized, isLocalizedPair } from '../models/localized';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language = signal<Language.polish | Language.english>(Language.polish);

  isEnglish = computed(() => this.language() === Language.english);

  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  constructor() {
    // Keep <html lang> in sync for accessibility and SEO.
    effect(() => {
      this.document.documentElement.lang = this.isEnglish() ? 'en' : 'pl';
    });
  }

  localize<T>(value: Localized<T>): T {
    if (isLocalizedPair(value)) {
      return this.isEnglish() ? value.en : value.pl;
    }
    return value;
  }

  toggle() {
    const lang = this.isEnglish() ? 'pl' : 'en';

    this.router.navigate([], { queryParams: { lang }, queryParamsHandling: 'merge' });
  }
}
