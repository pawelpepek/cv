import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-double-li',
    imports: [NgClass],
    template: `<li class="flex gap-1 mb-05 items-center leading-[120%] lg:leading-inherit my-2 lg:my-0 print:leading-inherit print:my-0"
                 [ngClass]="multiline() ? 'pb-2' : 'h-[1.9167rem]'">
    <ng-content select=".first" />
    <ng-content select=".second" />
  </li>`
})
export class DoubleLiComponent {
  multiline = input<boolean>(false);
}
