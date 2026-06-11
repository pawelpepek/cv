import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language';
import { PROJECTS } from '../../../models/project';
import { isLocalizedPair } from '../../../models/localized';

describe('ProjectsComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  let service: LanguageService;

  const items = () =>
    Array.from(fixture.nativeElement.querySelectorAll('li') as NodeListOf<HTMLLIElement>);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: Router, useValue: { navigate: vi.fn() } },
      ],
    });

    service = TestBed.inject(LanguageService);
    fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();
  });

  it('renders one list item per project with its Polish name', () => {
    expect(items().length).toBe(PROJECTS.length);

    for (const project of PROJECTS) {
      const name = isLocalizedPair(project.name) ? project.name.pl : project.name;
      expect(fixture.nativeElement.textContent).toContain(name);
    }
  });

  it('switches the names to English when the language flips', () => {
    service.language.set(Language.english);
    fixture.detectChanges();

    for (const project of PROJECTS) {
      const name = isLocalizedPair(project.name) ? project.name.en : project.name;
      expect(fixture.nativeElement.textContent).toContain(name);
    }
  });

  it('renders projects with an href as links and the rest as plain text', () => {
    for (const [index, project] of PROJECTS.entries()) {
      const anchor = items()[index].querySelector('a');

      if (project.href) {
        expect(anchor?.getAttribute('href')).toBe(project.href);
      } else {
        expect(anchor).toBeNull();
      }
    }
  });
});
