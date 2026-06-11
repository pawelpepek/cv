import { Localized } from './localized';

export const SECTION_TITLES = {
  experience: { pl: 'Doświadczenie zawodowe', en: 'Work experience' },
  projects: { pl: 'Najciekawsze projekty', en: 'Most interesting projects' },
  additional: { pl: 'Dodatkowe informacje', en: 'Additional' },
  skills: { pl: 'Umiejętności', en: 'Skills' },
  profile: { pl: 'Profil', en: 'Profile' },
  education: { pl: 'Edukacja', en: 'Education' },
} satisfies Record<string, Localized<string>>;
