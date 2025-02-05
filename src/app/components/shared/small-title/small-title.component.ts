import { Component, computed, inject, input } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-small-title',
  template: `<h5 class="font-bold mb-1 text-2xl">{{ displayedTitle()}}</h5>`,
  providers: [TranslatePipe]
})
export class SmallTitleComponent {
  title = input.required<string>();

  private readonly translate = inject(TranslatePipe);

  displayedTitle = computed(() => this.translate.transform(this.title()))
}
