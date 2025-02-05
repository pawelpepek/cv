import { Component, input } from '@angular/core';
import { SmallTitleComponent } from '../small-title/small-title.component';
import { ListComponent } from "../list/list.component";

@Component({
    selector: 'app-section-list',
    imports: [SmallTitleComponent, ListComponent],
    templateUrl: './section-list.component.html'
})
export class SectionListComponent {
  title = input.required<string>();
}
