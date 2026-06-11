import { BoldService } from './bold.service';
import { TextPart } from '../models/text-part';

describe('BoldService.splitTextToBoldArray', () => {
  let service: BoldService;

  beforeEach(() => {
    service = new BoldService();
  });

  it('returns the whole text as a single non-bold part when no terms are set', () => {
    const result = service.splitTextToBoldArray('plain text');

    expect(result).toEqual<TextPart[]>([{ text: 'plain text', bold: false }]);
  });

  it('splits a single mid-sentence match into before / match / after', () => {
    service.bold.set(['angular']);

    const result = service.splitTextToBoldArray('I use angular daily');

    expect(result).toEqual<TextPart[]>([
      { text: 'I use ', bold: false },
      { text: 'angular', bold: true },
      { text: ' daily', bold: false },
    ]);
  });

  it('matches case-insensitively', () => {
    service.bold.set(['angular']);

    const result = service.splitTextToBoldArray('Angular rocks');

    expect(result[0]).toEqual({ text: 'Angular', bold: true });
  });

  it('bolds several different terms in one text', () => {
    service.bold.set(['angular', 'sql']);

    const result = service.splitTextToBoldArray('angular and sql');

    expect(result).toEqual<TextPart[]>([
      { text: 'angular', bold: true },
      { text: ' and ', bold: false },
      { text: 'sql', bold: true },
    ]);
  });

  it('does not bold a term that is only a fragment of a larger word', () => {
    service.bold.set(['sql']);

    const result = service.splitTextToBoldArray('mysql server');

    expect(result).toEqual<TextPart[]>([{ text: 'mysql server', bold: false }]);
  });

  it('does not bold a term inside an excluded phrase but bolds it elsewhere', () => {
    service.bold.set(['.net']);
    service.exclude.set(['.NET Framework/Core']);

    const result = service.splitTextToBoldArray('I used .NET Framework/Core and .NET daily');

    expect(result).toEqual<TextPart[]>([
      { text: 'I used .NET Framework/Core and ', bold: false },
      { text: '.NET', bold: true },
      { text: ' daily', bold: false },
    ]);
  });

  it('matches excluded phrases case-insensitively', () => {
    service.bold.set(['.net']);
    service.exclude.set(['.net framework/core']);

    const result = service.splitTextToBoldArray('Apps in .NET Framework/Core');

    expect(result).toEqual<TextPart[]>([{ text: 'Apps in .NET Framework/Core', bold: false }]);
  });

  it('behaves as before when exclude is empty', () => {
    service.bold.set(['.net']);
    service.exclude.set([]);

    const result = service.splitTextToBoldArray('I use .NET daily');

    expect(result).toEqual<TextPart[]>([
      { text: 'I use ', bold: false },
      { text: '.NET', bold: true },
      { text: ' daily', bold: false },
    ]);
  });

  it('skips every occurrence of the excluded phrase', () => {
    service.bold.set(['.net']);
    service.exclude.set(['.NET Framework/Core']);

    const result = service.splitTextToBoldArray('.NET Framework/Core, .NET and .NET Framework/Core');

    expect(result).toEqual<TextPart[]>([
      { text: '.NET Framework/Core, ', bold: false },
      { text: '.NET', bold: true },
      { text: ' and .NET Framework/Core', bold: false },
    ]);
  });

  it('treats terms literally, not as regex patterns', () => {
    service.bold.set(['.net']);

    const result = service.splitTextToBoldArray('monet painting');

    expect(result).toEqual<TextPart[]>([{ text: 'monet painting', bold: false }]);
  });
});
