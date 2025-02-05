import { Component, input } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { BoldingDivComponent } from "../bolding-div/bolding-div.component";

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  imports: [IconComponent, BoldingDivComponent]
})
export class LinkComponent {
  href = input.required<string>();
  ariaLabel = input.required<string>();
  text = input.required<string>();
  showIcon = input<boolean>(false);
}
