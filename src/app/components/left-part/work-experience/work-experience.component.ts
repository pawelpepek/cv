import { Component } from '@angular/core';
import { SectionListComponent } from '../../shared/section-list/section-list.component';
import { EXPERIENCES } from '../../../models/experience';
import { ExperienceItemComponent } from "./experience-item/experience-item.component";
import { SECTION_TITLES } from '../../../models/section-titles';

@Component({
  selector: 'app-work-experience',
  imports: [SectionListComponent, ExperienceItemComponent],
  templateUrl: './work-experience.component.html'
})
export class WorkExperienceComponent {
  readonly title = SECTION_TITLES.experience;
  readonly experiences = EXPERIENCES;
}
