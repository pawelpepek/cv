import { Component, input } from '@angular/core';
import { SmallTitleComponent } from '../small-title/small-title.component';
import { ListComponent } from '../list/list.component';
import { Localized } from '../../../models/localized';

@Component({
  selector: 'app-section-list',
  imports: [SmallTitleComponent, ListComponent],
  templateUrl: './section-list.component.html'
})
export class SectionListComponent {
  title = input.required<Localized<string>>();
}
