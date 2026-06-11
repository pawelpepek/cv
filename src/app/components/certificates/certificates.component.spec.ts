import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CertificatesComponent } from './certificates.component';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language';

describe('CertificatesComponent', () => {
  let fixture: ComponentFixture<CertificatesComponent>;
  let service: LanguageService;

  const image = () => fixture.nativeElement.querySelector('img') as HTMLImageElement;
  const buttons = () =>
    Array.from(fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CertificatesComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });

    service = TestBed.inject(LanguageService);
    fixture = TestBed.createComponent(CertificatesComponent);
    fixture.detectChanges();
  });

  it('renders a selector button per certificate and shows B2.1 by default', () => {
    expect(buttons().length).toBe(fixture.componentInstance.certs.length);
    expect(image().getAttribute('src')).toBe('assets/img/B21.jpg');
    expect(image().getAttribute('alt')).toBe('B2.1');
  });

  it('switches the displayed certificate when another one is selected', () => {
    buttons()[1].click();
    fixture.detectChanges();

    expect(image().getAttribute('src')).toBe('assets/img/B13.jpg');
    expect(image().getAttribute('alt')).toBe('B1.3');
  });

  it('renders the header in Polish by default and in English after the flip', () => {
    expect(fixture.nativeElement.textContent).toContain('Certyfikaty językowe');

    service.language.set(Language.english);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Language certificates');
  });

  it('links back to the CV root', () => {
    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor.getAttribute('href')).toBe('/');
  });
});
