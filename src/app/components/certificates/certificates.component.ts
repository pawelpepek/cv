import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

type CertId = 'B21' | 'B13';

interface Cert {
  id: CertId;
  label: string;
  src: string;
}

@Component({
  selector: 'app-certificates',
  imports: [RouterLink],
  templateUrl: './certificates.component.html'
})
export class CertificatesComponent {
  readonly language = inject(LanguageService);

  readonly certs: Cert[] = [
    { id: 'B21', label: 'B2.1', src: 'assets/img/B21.jpg' },
    { id: 'B13', label: 'B1.3', src: 'assets/img/B13.jpg' },
  ];

  selected = signal<CertId>('B21');

  current = computed(() => this.certs.find(cert => cert.id === this.selected())!);

  select(id: CertId): void {
    this.selected.set(id);
  }
}
