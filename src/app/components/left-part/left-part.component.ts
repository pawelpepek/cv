import { Component } from '@angular/core';
import { AboutMeComponent } from './about-me/about-me.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { FooterComponent } from './footer/footer.component';
import { SectionIconListComponent } from '../shared/section-icon-list/section-icon-list.component';
import { ADDITIONAL_INFO } from '../../models/icon-text-item';

@Component({
  selector: 'app-left-part',
  imports: [AboutMeComponent, WorkExperienceComponent, FooterComponent, ProjectsComponent, SectionIconListComponent],
  templateUrl: './left-part.component.html'
})
export class LeftPartComponent {
  readonly ADDITIONAL_INFO = ADDITIONAL_INFO;
}
