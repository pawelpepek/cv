import { isLocalizedPair, Localized } from './localized';

describe('isLocalizedPair', () => {
  it('returns true for a { pl, en } pair', () => {
    expect(isLocalizedPair({ pl: 'a', en: 'b' })).toBe(true);
  });

  it('returns false for a plain (universal) string', () => {
    expect(isLocalizedPair('x')).toBe(false);
  });

  it('returns false for an array (universal Localized<string[]>)', () => {
    const value: Localized<string[]> = ['a', 'b'];
    expect(isLocalizedPair(value)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isLocalizedPair(null as unknown as Localized<string>)).toBe(false);
  });

  it('returns false when the "en" half is missing', () => {
    expect(isLocalizedPair({ pl: 'a' } as unknown as Localized<string>)).toBe(false);
  });
});
