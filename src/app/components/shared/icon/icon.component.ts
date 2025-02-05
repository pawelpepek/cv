import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { MaterialIconComponent } from '../material-icon/material-icon.component';
import { IconVersion } from '../../../models/icon-version';

@Component({
    selector: 'app-icon',
    imports: [NgClass, MaterialIconComponent],
    templateUrl: './icon.component.html'
})
export class IconComponent {
  icon = input.required<string>();
  version = input<IconVersion>('material');
  iconClass = input<string>('');
}
