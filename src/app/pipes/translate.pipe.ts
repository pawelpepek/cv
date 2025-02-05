import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

const ENG_TEXTS: Map<string, string> = new Map([
  ['Najciekawsze projekty', 'Most interesting projects'],
  ['Edukacja', 'Education'],
  ['Umiejętności', 'Skills'],
  ['Profil', 'Profile'],
  ['Dodatkowe informacje', 'Additional'],
  ['Doświadczenie zawodowe', 'Work experience'],
]);

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {

  private readonly languageService = inject(LanguageService);

  transform(text: string): string {
    return this.languageService.isEnglish() ? ENG_TEXTS.get(text) ?? text : text;
  }
}
