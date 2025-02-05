import { Component, computed, inject } from '@angular/core';
import { SectionListComponent } from '../../shared/section-list/section-list.component';
import { EXPERIENCES } from '../../../models/experience';
import { ExperienceItemComponent } from "./experience-item/experience-item.component";
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'app-work-experience',
    imports: [SectionListComponent, ExperienceItemComponent],
    templateUrl: './work-experience.component.html'
})
export class WorkExperienceComponent {
  data = computed(() => this.languageService.filter(EXPERIENCES));

  private readonly languageService = inject(LanguageService);
}
