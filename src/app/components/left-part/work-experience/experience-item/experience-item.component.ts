import { Component, computed, inject, input } from '@angular/core';
import { Experience } from '../../../../models/experience';
import { BoldingDivComponent } from "../../../shared/bolding-div/bolding-div.component";
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-experience-item',
  imports: [BoldingDivComponent],
  templateUrl: './experience-item.component.html'
})
export class ExperienceItemComponent {
  data = input.required<Experience>();

  conjunction = computed(() => this.langService.isEnglish() ? "at" : "w");

  position = computed(() => this.langService.localize(this.data().position));
  period = computed(() => this.langService.localize(this.data().period));
  description = computed(() => this.langService.localize(this.data().description));

  private readonly langService = inject(LanguageService);
}
