import { Component, computed, inject, input } from '@angular/core';
import { Localized } from '../../../models/localized';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-small-title',
  template: `<h5 class="font-bold mb-1 text-2xl">{{ displayedTitle() }}</h5>`,
})
export class SmallTitleComponent {
  title = input.required<Localized<string>>();

  private readonly languageService = inject(LanguageService);

  displayedTitle = computed(() => this.languageService.localize(this.title()));
}
