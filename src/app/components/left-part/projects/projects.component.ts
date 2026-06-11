import { Component, computed, inject } from '@angular/core';
import { SectionListComponent } from '../../shared/section-list/section-list.component';
import { PROJECTS } from '../../../models/project';
import { BoldingDivComponent } from '../../shared/bolding-div/bolding-div.component';
import { LanguageService } from '../../../services/language.service';
import { LinkComponent } from '../../shared/link/link.component';
import { SECTION_TITLES } from '../../../models/section-titles';

@Component({
  selector: 'app-projects',
  imports: [SectionListComponent, BoldingDivComponent, LinkComponent],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  readonly title = SECTION_TITLES.projects;

  data = computed(() => PROJECTS.map(project => ({
    id: project.id,
    name: this.languageService.localize(project.name),
    description: this.languageService.localize(project.description),
    href: project.href,
  })));

  private readonly languageService = inject(LanguageService);
}
