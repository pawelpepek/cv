import { computed, inject, Injectable, signal } from "@angular/core";
import { Language } from "../models/language";
import { Translatable } from "../models/translatable";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language = signal<Language.polish | Language.english>(Language.polish);

  isEnglish = computed(() => this.language() === Language.english);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  filter<T extends Translatable>(array: T[]): T[] {
    return array.filter(item =>
      !item.language
      || item.language === Language.universal
      || item.language === this.language());
  }

  find<T extends Translatable>(array: T[]) {
    return array.find(item => item.language === this.language())
  }

  toggle() {
    const params = this.route.snapshot.queryParams;
    const lang = this.isEnglish() ? "pln" : "eng";

    this.router.navigate([], { queryParams: { ...params, lang } });
  }
}