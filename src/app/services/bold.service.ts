import { Injectable, signal } from '@angular/core';
import { TextPart } from '../models/text-part';

@Injectable({
  providedIn: 'root',
})
export class BoldService {
  bold = signal<string[]>([]);
  exclude = signal<string[]>([]);

  splitTextToBoldArray(inputText: string): TextPart[] {
    if (this.bold()?.length === 0) {
      return [{
        text: inputText,
        bold: false,
      }]
    }

    const excludedRanges = this.getExcludedRanges(inputText);

    const result: TextPart[] = [];

    const regex = new RegExp(`(${this.bold().map(m => {
      const term = escapeRegExp(m);
      return `\\b${term}\\b|(?<=\\W)${term}(?=\\W|$)|^${term}(?=\\W|$)`;
    }).join('|')})`, 'gmi');

    let lastIndex = 0;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(inputText)) !== null) {
      const [matchedWord] = match;
      const matchIndex = match.index;
      const matchEnd = matchIndex + matchedWord.length;

      if (excludedRanges.some(r => matchIndex < r.end && matchEnd > r.start)) {
        continue;
      }

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

      lastIndex = matchEnd;
    }

    if (lastIndex < inputText.length) {
      result.push({
        text: inputText.slice(lastIndex),
        bold: false,
      });
    }

    return result;
  }

  private getExcludedRanges(inputText: string): { start: number, end: number }[] {
    const phrases = this.exclude().filter(p => p.trim().length > 0);

    if (phrases.length === 0) {
      return [];
    }

    const regex = new RegExp(phrases.map(escapeRegExp).join('|'), 'gi');
    const ranges: { start: number, end: number }[] = [];

    let match: RegExpExecArray | null;

    while ((match = regex.exec(inputText)) !== null) {
      ranges.push({ start: match.index, end: match.index + match[0].length });
    }

    return ranges;
  }
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
