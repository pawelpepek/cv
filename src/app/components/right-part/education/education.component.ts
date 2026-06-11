import { Component, computed, inject } from '@angular/core';
import { SectionListComponent } from '../../shared/section-list/section-list.component';
import { LanguageService } from '../../../services/language.service';
import { EDUCATION } from '../../../models/education';
import { SECTION_TITLES } from '../../../models/section-titles';

@Component({
  selector: 'app-education',
  imports: [SectionListComponent],
  templateUrl: './education.component.html'
})
export class EducationComponent {
  readonly title = SECTION_TITLES.education;

  data = computed(() => this.languageService.localize(EDUCATION));

  private readonly languageService = inject(LanguageService);
}
