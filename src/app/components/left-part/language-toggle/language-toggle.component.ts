import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'app-language-toggle',
    templateUrl: './language-toggle.component.html'
})
export class LanguageToggleComponent {
  readonly service = inject(LanguageService);

  toggleButtonState() {
    this.service.toggle();
  }
}
