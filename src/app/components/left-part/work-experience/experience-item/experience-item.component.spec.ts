import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ExperienceItemComponent } from './experience-item.component';
import { LanguageService } from '../../../../services/language.service';
import { Language } from '../../../../models/language';
import { Experience, Sector } from '../../../../models/experience';

describe('ExperienceItemComponent', () => {
  let fixture: ComponentFixture<ExperienceItemComponent>;
  let service: LanguageService;

  const experience: Experience = {
    id: 1,
    period: { pl: 'I 2020 - nadal', en: 'I 2020 - still' },
    position: { pl: 'Programista', en: 'Developer' },
    description: { pl: 'Rozwój aplikacji.', en: 'Application development.' },
    sector: Sector.programming,
    company: 'Acme',
  };

  const text = () => fixture.nativeElement.textContent as string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExperienceItemComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: Router, useValue: { navigate: vi.fn() } },
      ],
    });

    service = TestBed.inject(LanguageService);
    fixture = TestBed.createComponent(ExperienceItemComponent);
    fixture.componentRef.setInput('data', experience);
    fixture.detectChanges();
  });

  it('renders the Polish position, conjunction, company, period and description by default', () => {
    expect(text()).toContain('Programista w Acme');
    expect(text()).toContain('I 2020 - nadal');
    expect(text()).toContain('Rozwój aplikacji.');
  });

  it('switches to the English texts when the language flips', () => {
    service.language.set(Language.english);
    fixture.detectChanges();

    expect(text()).toContain('Developer at Acme');
    expect(text()).toContain('I 2020 - still');
    expect(text()).toContain('Application development.');
  });
});
