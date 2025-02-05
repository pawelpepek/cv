import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
    <ul>
      <ng-content />
    </ul>`
})
export class ListComponent { }
