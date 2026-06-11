import { computed, Injectable, signal } from '@angular/core';
import { TextPart } from '../models/text-part';

@Injectable({
  providedIn: 'root',
})
export class BoldService {
  bold = signal<string[]>([]);
  exclude = signal<string[]>([]);

  // Compiled once per `bold`/`exclude` change instead of in every
  // splitTextToBoldArray call — each bolding-div on the page calls it.
  //
  // Three alternatives per term because `\b` only matches between a word and
  // a non-word character: terms that start or end with a non-word character
  // (".NET", "C++") never match `\b{term}\b`, so they are anchored on a
  // neighbouring non-word character (or line start / end of input) instead.
  private readonly boldRegex = computed(() => {
    const terms = this.bold().filter(m => m.trim().length > 0);

    if (terms.length === 0) {
      return null;
    }

    return new RegExp(`(${terms.map(m => {
      const term = escapeRegExp(m);
      return `\\b${term}\\b|(?<=\\W)${term}(?=\\W|$)|^${term}(?=\\W|$)`;
    }).join('|')})`, 'gmi');
  });

  private readonly excludeRegex = computed(() => {
    const phrases = this.exclude().filter(p => p.trim().length > 0);

    if (phrases.length === 0) {
      return null;
    }

    return new RegExp(phrases.map(escapeRegExp).join('|'), 'gi');
  });

  splitTextToBoldArray(inputText: string): TextPart[] {
    const regex = this.boldRegex();

    if (!regex) {
      return [{
        text: inputText,
        bold: false,
      }]
    }

    const excludedRanges = this.getExcludedRanges(inputText);

    const result: TextPart[] = [];

    // The shared 'g' regex is stateful — rewind it before scanning a new text.
    regex.lastIndex = 0;

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
    const regex = this.excludeRegex();

    if (!regex) {
      return [];
    }

    regex.lastIndex = 0;

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
