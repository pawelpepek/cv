import { Component } from '@angular/core';
import { AboutMeComponent } from './about-me/about-me.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { SectionIconListComponent } from '../shared/section-icon-list/section-icon-list.component';
import { ADDITIONAL_INFO } from '../../models/icon-text-item';
import { SECTION_TITLES } from '../../models/section-titles';

@Component({
  selector: 'app-left-part',
  imports: [AboutMeComponent, WorkExperienceComponent, ProjectsComponent, SectionIconListComponent],
  templateUrl: './left-part.component.html'
})
export class LeftPartComponent {
  readonly titles = SECTION_TITLES;
  readonly ADDITIONAL_INFO = ADDITIONAL_INFO;
}
