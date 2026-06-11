import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from './language.service';
import { Language } from '../models/language';

describe('LanguageService.localize', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } },
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    });
    service = TestBed.inject(LanguageService);
  });

  it('defaults to Polish', () => {
    expect(service.isEnglish()).toBe(false);
    expect(service.localize({ pl: 'a', en: 'b' })).toBe('a');
  });

  it('returns a plain (universal) value unchanged regardless of language', () => {
    expect(service.localize('x')).toBe('x');

    service.language.set(Language.english);
    expect(service.localize('x')).toBe('x');
  });

  it('resolves the English half once the language signal switches', () => {
    service.language.set(Language.english);

    expect(service.isEnglish()).toBe(true);
    expect(service.localize({ pl: 'a', en: 'b' })).toBe('b');
  });
});
