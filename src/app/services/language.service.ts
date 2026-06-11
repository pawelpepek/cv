import { computed, inject, Injectable, signal } from "@angular/core";
import { Language } from "../models/language";
import { Localized, isLocalizedPair } from "../models/localized";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language = signal<Language.polish | Language.english>(Language.polish);

  isEnglish = computed(() => this.language() === Language.english);

  private readonly router = inject(Router);

  localize<T>(value: Localized<T>): T {
    if (isLocalizedPair(value)) {
      return this.isEnglish() ? value.en : value.pl;
    }
    return value;
  }

  toggle() {
    const lang = this.isEnglish() ? "pl" : "en";

    this.router.navigate([], { queryParams: { lang }, queryParamsHandling: 'merge' });
  }
}
