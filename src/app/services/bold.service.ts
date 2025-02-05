import { Injectable, signal } from '@angular/core';
import { TextPart } from '../models/text-part';

@Injectable({
  providedIn: 'root',
})
export class BoldService {
  bold = signal<string[]>([]);

  splitTextToBoldArray(inputText: string): TextPart[] {
    if (this.bold()?.length === 0) {
      return [{
        text: inputText,
        bold: false,
      }]
    }

    const result: TextPart[] = [];

    const regex = new RegExp(`(${this.bold().map(m => `\\b${m}\\b|(?<=\\W)${m}(?=\\W|$)|^${m}(?=\\W|$)`).join('|')})`, 'gmi');

    let lastIndex = 0;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(inputText)) !== null) {
      const [matchedWord] = match;
      const matchIndex = match.index;

      if (matchIndex > lastIndex) {
        result.push({
          text: inputText.slice(lastIndex, matchIndex),
          bold: false,
        });
      }

      result.push({
        text: matchedWord,
        bold: true,
      });

      lastIndex = matchIndex + matchedWord.length;
    }

    if (lastIndex < inputText.length) {
      result.push({
        text: inputText.slice(lastIndex),
        bold: false,
      });
    }

    return result;
  }
}
