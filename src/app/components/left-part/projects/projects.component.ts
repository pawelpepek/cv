import { Component, computed, inject } from '@angular/core';
import { SectionListComponent } from '../../shared/section-list/section-list.component';
import { PROJECTS } from '../../../models/project';
import { BoldingDivComponent } from "../../shared/bolding-div/bolding-div.component";
import { LanguageService } from '../../../services/language.service';
import { LinkComponent } from "../../shared/link/link.component";

@Component({
  selector: 'app-projects',
  imports: [SectionListComponent, BoldingDivComponent, LinkComponent],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  data = computed(() => this.languageService.filter(PROJECTS));

  private readonly languageService = inject(LanguageService);
}
