import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { BoldingDivComponent } from '../bolding-div/bolding-div.component';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  imports: [IconComponent, BoldingDivComponent, RouterLink]
})
export class LinkComponent {
  // undefined renders an anchor without href — inert and unfocusable
  // (used for the placeholder phone before a ?key= reveals the real one).
  href = input.required<string | undefined>();
  ariaLabel = input.required<string>();
  text = input.required<string>();
  showIcon = input<boolean>(false);
  internal = input<boolean>(false);
}
