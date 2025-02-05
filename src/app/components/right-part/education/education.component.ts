import { Component, computed, inject } from '@angular/core';
import { SectionListComponent } from "../../shared/section-list/section-list.component";
import { LanguageService } from '../../../services/language.service';
import { EDUCATIONS } from '../../../models/education';

@Component({
  selector: 'app-education',
  imports: [SectionListComponent],
  templateUrl: './education.component.html'
})
export class EducationComponent {
  data = computed(() => this.languageService.find(EDUCATIONS));

  readonly languageService = inject(LanguageService);
}
