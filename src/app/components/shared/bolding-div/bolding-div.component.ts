import { Component, computed, inject, input } from '@angular/core';
import { BoldService } from '../../../services/bold.service';

@Component({
  selector: 'app-bolding-div',
  templateUrl: './bolding-div.component.html'
})
export class BoldingDivComponent {
  text = input.required<string>();
  justify = input<boolean>(false);

  texts = computed(() => this.boldService.splitTextToBoldArray(this.text()));

  readonly boldService = inject(BoldService);
}
