import { Component, input } from '@angular/core';
import { MaterialIconComponent } from '../material-icon/material-icon.component';
import { NgClass } from '@angular/common';
import { IconVersion } from '../../../models/icon-version';

@Component({
  selector: 'app-linked-icon',
  standalone: true,
  imports: [NgClass, MaterialIconComponent],
  templateUrl: './linked-icon.component.html',
})
export class LinkedIconComponent {
  icon = input.required<string>();
  version = input<IconVersion>('material');
  iconClass = input<string>('');
  href = input.required<string>();
  ariaLabel = input.required<string>();
}
