import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SectionIconListComponent } from './section-icon-list.component';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language';
import { IconTextItem } from '../../../models/icon-text-item';

const DATA: IconTextItem[] = [
  { icon: 'school', text: { pl: 'Wykształcenie', en: 'Education' } },
  {
    icon: 'mail',
    text: 'mail@example.com',
    link: {
      href: 'mailto:mail@example.com',
      ariaLabel: { pl: 'adres e-mail', en: 'e-mail address' },
    },
  },
];

describe('SectionIconListComponent', () => {
  let fixture: ComponentFixture<SectionIconListComponent>;
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SectionIconListComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });

    service = TestBed.inject(LanguageService);
    fixture = TestBed.createComponent(SectionIconListComponent);
    fixture.componentRef.setInput('data', DATA);
    fixture.componentRef.setInput('title', { pl: 'Sekcja', en: 'Section' });
    fixture.detectChanges();
  });

  it('renders the title and one list item per entry', () => {
    expect(fixture.nativeElement.textContent).toContain('Sekcja');
    expect(fixture.nativeElement.querySelectorAll('[role="listitem"]').length).toBe(DATA.length);
  });

  it('renders entries without a link as plain items and linked entries as anchors', () => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toBe(1);

    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor.getAttribute('href')).toBe('mailto:mail@example.com');
    expect(anchor.getAttribute('aria-label')).toBe('adres e-mail');
  });

  it('localizes texts, the title and aria-labels when the language flips', () => {
    service.language.set(Language.english);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Section');
    expect(fixture.nativeElement.textContent).toContain('Education');
    expect(fixture.nativeElement.textContent).not.toContain('Wykształcenie');

    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor.getAttribute('aria-label')).toBe('e-mail address');
  });
});
