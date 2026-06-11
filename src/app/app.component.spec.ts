import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { BoldService } from './services/bold.service';
import { FirebaseService } from './services/firebase.service';
import { LanguageService } from './services/language.service';
import { Language } from './models/language';

describe('AppComponent query params', () => {
  let queryParams: Subject<Record<string, string>>;
  let loadPhone: ReturnType<typeof vi.fn>;
  let boldService: BoldService;
  let languageService: LanguageService;

  beforeEach(() => {
    queryParams = new Subject();
    loadPhone = vi.fn();

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { queryParams } },
        { provide: FirebaseService, useValue: { loadPhone } },
      ],
    });

    boldService = TestBed.inject(BoldService);
    languageService = TestBed.inject(LanguageService);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('splits highlight and exclude into term lists', () => {
    queryParams.next({ highlight: '.net,angular,sql', exclude: '.NET Framework/Core' });

    expect(boldService.bold()).toEqual(['.net', 'angular', 'sql']);
    expect(boldService.exclude()).toEqual(['.NET Framework/Core']);
  });

  it('resets terms and language when params are absent', () => {
    queryParams.next({ highlight: 'angular', lang: 'en' });
    queryParams.next({});

    expect(boldService.bold()).toEqual([]);
    expect(boldService.exclude()).toEqual([]);
    expect(languageService.language()).toBe(Language.polish);
  });

  it('sets the language from lang, accepting legacy values', () => {
    queryParams.next({ lang: 'en' });
    expect(languageService.language()).toBe(Language.english);

    queryParams.next({ lang: 'eng' });
    expect(languageService.language()).toBe(Language.english);

    queryParams.next({ lang: 'pln' });
    expect(languageService.language()).toBe(Language.polish);
  });

  it('falls back to Polish for an invalid lang value', () => {
    queryParams.next({ lang: 'de' });

    expect(languageService.language()).toBe(Language.polish);
  });

  it('requests the phone only when a key is present', () => {
    queryParams.next({});
    expect(loadPhone).not.toHaveBeenCalled();

    queryParams.next({ key: 'secret-doc-id' });
    expect(loadPhone).toHaveBeenCalledWith('secret-doc-id');
  });
});
