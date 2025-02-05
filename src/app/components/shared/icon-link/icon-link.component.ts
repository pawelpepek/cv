import { Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { DoubleLiComponent } from '../double-li/double-li.component';
import { IconVersion } from '../../../models/icon-version';
import { LinkComponent } from "../link/link.component";

@Component({
  selector: 'app-icon-link',
  imports: [IconComponent, DoubleLiComponent, LinkComponent, LinkComponent],
  templateUrl: './icon-link.component.html'
})
export class IconLinkComponent {
  icon = input.required<string>();
  iconVersion = input<IconVersion>("material");
  href = input.required<string>();
  ariaLabel = input.required<string>();
  text = input.required<string>();
  showIcon = input<boolean>(false);
}
