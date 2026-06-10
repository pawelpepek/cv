import { Component } from '@angular/core';
import { PersonalInfoComponent } from "./personal-info/personal-info.component";
import { EducationComponent } from "./education/education.component";
import { SectionIconListComponent } from '../shared/section-icon-list/section-icon-list.component';
import { PROFILE_INFO, SKILLS } from '../../models/icon-text-item';
import { SECTION_TITLES } from '../../models/section-titles';

@Component({
    selector: 'app-right-part',
    imports: [PersonalInfoComponent, EducationComponent, SectionIconListComponent],
    templateUrl: './right-part.component.html'
})
export class RightPartComponent {
  readonly titles = SECTION_TITLES;
  readonly PROFILE_INFO = PROFILE_INFO;
  readonly SKILLS = SKILLS;
}
