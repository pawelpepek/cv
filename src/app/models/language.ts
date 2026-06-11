export enum Language {
    polish = 2,
    english = 3,
}

// ISO codes are canonical; `pln`/`eng` are legacy aliases kept so that
// already-shared links keep working.
export const Languages: Record<string, Language.polish | Language.english> = {
    pl: Language.polish,
    en: Language.english,
    pln: Language.polish,
    eng: Language.english,
}
