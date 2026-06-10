interface LocalizedPair<T> {
  pl: T;
  en: T;
}

/**
 * A value that is either the same in every language (a plain `T`)
 * or differs per language (a `{ pl, en }` pair).
 * Resolve it with `LanguageService.localize`.
 */
export type Localized<T> = T | LocalizedPair<T>;

export function isLocalizedPair<T>(value: Localized<T>): value is LocalizedPair<T> {
  return typeof value === 'object' && value !== null && 'pl' in value && 'en' in value;
}
