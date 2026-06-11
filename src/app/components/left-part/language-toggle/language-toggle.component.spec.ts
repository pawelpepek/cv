import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageToggleComponent } from './language-toggle.component';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language';

describe('LanguageToggleComponent', () => {
  let fixture: ComponentFixture<LanguageToggleComponent>;
  let service: LanguageService;
  let navigate: ReturnType<typeof vi.fn>;

  const dot = () => fixture.nativeElement.querySelector('.dot') as HTMLElement;

  beforeEach(() => {
    navigate = vi.fn();
    TestBed.configureTestingModule({
      imports: [LanguageToggleComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } },
        { provide: Router, useValue: { navigate } },
      ],
    });
    service = TestBed.inject(LanguageService);
    fixture = TestBed.createComponent(LanguageToggleComponent);
    fixture.detectChanges();
  });

  it('renders the Polish state by default', () => {
    expect(dot().classList.contains('pln')).toBe(true);
    expect(dot().classList.contains('eng')).toBe(false);
    expect(dot().classList.contains('translate-x-6')).toBe(false);
  });

  it('switches the visual state when the language signal flips to English', () => {
    service.language.set(Language.english);
    fixture.detectChanges();

    expect(dot().classList.contains('eng')).toBe(true);
    expect(dot().classList.contains('pln')).toBe(false);
    expect(dot().classList.contains('translate-x-6')).toBe(true);
  });

  it('navigates to the other language on click, merging existing query params', () => {
    const checkbox = fixture.nativeElement.querySelector('input#toggle') as HTMLInputElement;
    checkbox.click();

    expect(navigate).toHaveBeenCalledWith([], {
      queryParams: { lang: 'en' },
      queryParamsHandling: 'merge',
    });
  });
});
