import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-double-li',
  imports: [NgClass],
  // A <div>, not a <li>: the listitem role lives on the host of app-icon-li /
  // app-icon-link (the direct children of the <ul> in app-list) — a nested <li>
  // here would break list semantics (axe `list`/`listitem`).
  template: `
    <div class="flex gap-1 mb-05 items-center leading-[120%] lg:leading-inherit my-2 lg:my-0 print:leading-inherit print:my-0"
         [ngClass]="(multiline() ? 'pb-2' : 'h-[1.9167rem] print:h-[1.7rem]') + ' ' + liClass()">
      <ng-content select=".first" />
      <ng-content select=".second" />
    </div>`
})
export class DoubleLiComponent {
  multiline = input<boolean>(false);
  liClass = input<string>('');
}
