import { Component, computed, inject, input } from '@angular/core';
import { IconTextItem } from '../../../models/icon-text-item';
import { IconLiComponent } from '../icon-li/icon-li.component';
import { SectionListComponent } from '../section-list/section-list.component';
import { LanguageService } from '../../../services/language.service';
import { IconLinkComponent } from '../icon-link/icon-link.component';
import { Localized } from '../../../models/localized';

@Component({
  selector: 'app-section-icon-list',
  imports: [IconLiComponent, SectionListComponent, IconLinkComponent],
  templateUrl: './section-icon-list.component.html'
})
export class SectionIconListComponent {
  data = input.required<IconTextItem[]>();
  title = input.required<Localized<string>>();
  liClass = input<string>('');

  displayedData = computed(() =>
    this.data().map(item => ({
      icon: item.icon,
      iconVersion: item.iconVersion,
      break: item.break,
      text: this.languageService.localize(item.text),
      link: item.link
        ? {
            href: item.link.href,
            ariaLabel: this.languageService.localize(item.link.ariaLabel),
            showIcon: item.link.showIcon,
            internal: item.link.internal,
          }
        : undefined,
    }))
  );

  private readonly languageService = inject(LanguageService);
}
