import { Component, computed, inject, input } from '@angular/core';
import { IconTextItem } from '../../../models/icon-text-item';
import { IconLiComponent } from '../icon-li/icon-li.component';
import { SectionListComponent } from '../section-list/section-list.component';
import { LanguageService } from '../../../services/language.service';
import { IconLinkComponent } from "../icon-link/icon-link.component";

@Component({
  selector: 'app-section-icon-list',
  imports: [IconLiComponent, SectionListComponent, IconLinkComponent],
  templateUrl: './section-icon-list.component.html'
})
export class SectionIconListComponent {
  data = input.required<IconTextItem[]>();
  title = input.required<string>();

  displayedData = computed(() => this.languageService.filter(this.data()))

  private readonly languageService = inject(LanguageService);
}
