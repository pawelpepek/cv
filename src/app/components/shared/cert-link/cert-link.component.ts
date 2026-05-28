import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cert-link',
  templateUrl: './cert-link.component.html'
})
export class CertLinkComponent {
  href = input.required<string>();
  ariaLabel = input.required<string>();
}
