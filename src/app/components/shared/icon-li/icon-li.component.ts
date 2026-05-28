import { Component, input } from '@angular/core';
import { IconVersion } from '../../../models/icon-version';
import { DoubleLiComponent } from '../double-li/double-li.component';
import { IconComponent } from '../icon/icon.component';
import { BoldingDivComponent } from '../bolding-div/bolding-div.component';
import { CertLinkComponent } from '../cert-link/cert-link.component';

@Component({
  selector: 'app-icon-li',
  imports: [DoubleLiComponent, IconComponent, BoldingDivComponent, CertLinkComponent],
  templateUrl: './icon-li.component.html'
})
export class IconLiComponent {
  icon = input.required<string>();
  version = input<IconVersion>('material');
  iconClass = input<string>('');
  text = input.required<string>();
  multiline = input<boolean>(false);
  extraLinks = input<{ href: string; ariaLabel: string }[]>([]);
}
