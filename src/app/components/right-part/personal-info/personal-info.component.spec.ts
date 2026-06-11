import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalInfoComponent } from './personal-info.component';
import { FirebaseService } from '../../../services/firebase.service';

describe('PersonalInfoComponent', () => {
  let fixture: ComponentFixture<PersonalInfoComponent>;
  let phone: ReturnType<typeof signal<string>>;

  const phoneLink = () =>
    fixture.nativeElement.querySelector('a[aria-label="phone"]') as HTMLAnchorElement | null;

  beforeEach(() => {
    phone = signal('');

    TestBed.configureTestingModule({
      imports: [PersonalInfoComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: FirebaseService,
          useValue: {
            displayedPhone: () => phone() || '000 000 000',
            hrefPhone: () => phone() ? `tel:+48${phone().replace(/\s+/g, '')}` : undefined,
            hasPhone: () => !!phone(),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(PersonalInfoComponent);
    fixture.detectChanges();
  });

  it('shows the placeholder phone without a revealed number', () => {
    expect(fixture.nativeElement.textContent).toContain('000 000 000');
    expect(phoneLink()?.hasAttribute('href')).toBe(false);
  });

  it('shows the revealed phone with a tel: link', () => {
    phone.set('123 456 789');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('123 456 789');
    expect(phoneLink()?.getAttribute('href')).toBe('tel:+48123456789');
  });
});
