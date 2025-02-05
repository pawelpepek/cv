import { Component, computed, inject } from '@angular/core';
import { BoldingDivComponent } from "../../shared/bolding-div/bolding-div.component";
import { ABOUT_ME } from '../../../models/translatable-info';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-about-me',
  imports: [BoldingDivComponent],
  templateUrl: './about-me.component.html'
})
export class AboutMeComponent {
  data = computed(() => this.languageService.find(ABOUT_ME));

  private readonly languageService = inject(LanguageService);
}
