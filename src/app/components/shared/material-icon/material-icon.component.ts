import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-material-icon',
  imports: [NgClass],
  templateUrl: './material-icon.component.html'
})
export class MaterialIconComponent {
  icon = input.required<string>();
  classStyle = input<string>('');
}
