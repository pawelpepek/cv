import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoldingDivComponent } from './bolding-div.component';
import { BoldService } from '../../../services/bold.service';

describe('BoldingDivComponent', () => {
  let fixture: ComponentFixture<BoldingDivComponent>;
  let boldService: BoldService;

  const spans = () =>
    Array.from(fixture.nativeElement.querySelectorAll('span') as NodeListOf<HTMLSpanElement>);

  const boldedTexts = () =>
    spans().filter(s => s.classList.contains('font-black')).map(s => s.textContent);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoldingDivComponent],
      providers: [provideZonelessChangeDetection()],
    });

    boldService = TestBed.inject(BoldService);
    fixture = TestBed.createComponent(BoldingDivComponent);
  });

  it('renders the whole text as a single non-bold span when there are no terms', () => {
    fixture.componentRef.setInput('text', 'Angular and .NET');
    fixture.detectChanges();

    expect(spans().map(s => s.textContent)).toEqual(['Angular and .NET']);
    expect(boldedTexts()).toEqual([]);
  });

  it('bolds matched terms with the highlight classes', () => {
    boldService.bold.set(['angular', '.net']);
    fixture.componentRef.setInput('text', 'Angular and .NET projects');
    fixture.detectChanges();

    expect(boldedTexts()).toEqual(['Angular', '.NET']);

    const [bolded] = spans().filter(s => s.classList.contains('font-black'));
    expect(bolded.classList.contains('text-blue-800')).toBe(true);
    expect(bolded.classList.contains('blinking-text')).toBe(true);
    expect(fixture.nativeElement.textContent).toBe('Angular and .NET projects');
  });

  it('keeps matches inside an excluded phrase unbolded', () => {
    boldService.bold.set(['.net']);
    boldService.exclude.set(['.NET Framework']);
    fixture.componentRef.setInput('text', '.NET Framework and .NET Core');
    fixture.detectChanges();

    expect(boldedTexts()).toEqual(['.NET']);
  });

  it('re-renders when the terms change after the first render', () => {
    fixture.componentRef.setInput('text', 'Angular and SQL');
    fixture.detectChanges();
    expect(boldedTexts()).toEqual([]);

    boldService.bold.set(['sql']);
    fixture.detectChanges();
    expect(boldedTexts()).toEqual(['SQL']);
  });

  it('toggles the text-justify class from the justify input', () => {
    fixture.componentRef.setInput('text', 'text');
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    expect(div.classList.contains('text-justify')).toBe(false);

    fixture.componentRef.setInput('justify', true);
    fixture.detectChanges();
    expect(div.classList.contains('text-justify')).toBe(true);
  });
});
