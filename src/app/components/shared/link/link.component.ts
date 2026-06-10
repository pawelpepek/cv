import { Component, computed, inject, input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { IconComponent } from "../icon/icon.component";
import { BoldingDivComponent } from "../bolding-div/bolding-div.component";
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  imports: [IconComponent, BoldingDivComponent, RouterLink]
})
export class LinkComponent {
  href = input.required<string>();
  ariaLabel = input.required<string>();
  text = input.required<string>();
  showIcon = input<boolean>(false);
  internal = input<boolean>(false);

  private readonly languageService = inject(LanguageService);

  queryParams = computed<Params>(() =>
    this.languageService.isEnglish() ? { lang: 'eng' } : {});
}
