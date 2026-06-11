import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let fixture: ComponentFixture<LinkComponent>;

  const anchor = () => fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

  function create(inputs: { href: string | undefined; internal?: boolean; showIcon?: boolean }) {
    fixture = TestBed.createComponent(LinkComponent);
    fixture.componentRef.setInput('href', inputs.href);
    fixture.componentRef.setInput('ariaLabel', 'label');
    fixture.componentRef.setInput('text', 'link text');
    fixture.componentRef.setInput('internal', inputs.internal ?? false);
    fixture.componentRef.setInput('showIcon', inputs.showIcon ?? false);
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LinkComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });
  });

  it('renders an external link that opens in a new tab', () => {
    create({ href: 'https://example.com' });

    expect(anchor().getAttribute('href')).toBe('https://example.com');
    expect(anchor().getAttribute('target')).toBe('_blank');
    expect(anchor().getAttribute('rel')).toBe('noopener noreferrer');
    expect(anchor().getAttribute('aria-label')).toBe('label');
    expect(anchor().textContent).toContain('link text');
  });

  it('renders an inert anchor without href for an undefined href (phone placeholder)', () => {
    create({ href: undefined });

    expect(anchor().hasAttribute('href')).toBe(false);
  });

  it('renders an internal link via routerLink, staying in the same tab', () => {
    create({ href: '/certificates', internal: true });

    expect(anchor().getAttribute('href')).toBe('/certificates');
    expect(anchor().getAttribute('target')).toBeNull();
  });

  it('shows the link icon only when showIcon is set', () => {
    create({ href: 'https://example.com', showIcon: true });
    expect(fixture.nativeElement.querySelector('app-icon')).not.toBeNull();

    create({ href: 'https://example.com' });
    expect(fixture.nativeElement.querySelector('app-icon')).toBeNull();
  });
});
