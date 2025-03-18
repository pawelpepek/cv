import { IconVersion } from './icon-version';
import { Language } from './language';
import { Translatable } from './translatable';

export interface IconTextItem extends Translatable {
  icon: string;
  iconVersion?: IconVersion;
  text: string;
  break?: boolean;
  link?: {
    href: string;
    ariaLabel: string;
    showIcon?: boolean;
  }
}

export const SKILLS: IconTextItem[] = [
  {
    icon: 'code_blocks',
    text: 'C#, .NET Framework/Core, EF Core',
  },
  {
    icon: 'language',
    text: 'ASP.NET Core Web API (REST)',
  },
  {
    icon: 'desktop_windows',
    text: 'WPF, Winforms',
  },
  {
    icon: 'database',
    text: 'SQL, MSSQL, PostgreSQL, SQLite',
    break: true,
  },
  {
    icon: 'angular',
    iconVersion: 'brands',
    text: 'Angular (PrimeNG, Material, Kendo)',
  },
  {
    icon: 'react',
    iconVersion: 'brands',
    text: 'React (Redux, Router)',
  },
  {
    icon: 'html5',
    iconVersion: 'brands',
    text: 'HTML, CSS, SCSS',
  },
  {
    icon: 'bootstrap',
    iconVersion: 'brands',
    text: 'Bootstrap, Tailwind',
  },
  {
    icon: 'js',
    iconVersion: 'brands',
    text: 'JavaScript, TypeScript',
    break: true,
  },
  {
    icon: 'bug_report',
    text: 'Testy jednostkowe, integracyjne',
    language: Language.polish,
    break: true,
  },
  {
    icon: 'bug_report',
    text: 'Unit & Integration tests',
    language: Language.english,
    break: true,
  },
  {
    icon: 'docker',
    iconVersion: 'brands',
    text: 'Docker, CI/CD',
  },
  {
    icon: 'dns',
    text: 'IIS, NGINX',
  },
  {
    icon: 'cloud',
    text: 'Azure, Supabase, Firebase',
    break: true,
  },
  {
    icon: 'developer_mode_tv',
    text: 'VS, VS Code, Webstorm',
  },
  {
    icon: 'github',
    iconVersion: 'brands',
    text: 'Git, GitHub, GitLab',
  },
  {
    icon: 'ubuntu',
    iconVersion: 'brands',
    text: 'Linux, Bash',
    break: true,
  },
  {
    icon: 'cleaning_services',
    text: 'Clean Code, SOLID, DRY',
  },
  {
    icon: 'published_with_changes',
    text: 'Scrum, Jira, Code Review',
  },
];

export const ADDITIONAL_INFO: IconTextItem[] = [
  {
    icon: 'language_gb_english',
    text: 'Język angielski - Poziom B2',
    language: Language.polish,
  },
  {
    icon: 'school',
    text: 'Prawie 400 godzin kursów na Udemy z zakresu .NET, Frontend, SQL i Azure',
    language: Language.polish,
    link: {
      href: 'https://udemycoursespp.web.app',
      ariaLabel: "strona z moimi kursami Udemy",
      showIcon: true
    }
  },
  {
    icon: 'trophy',
    text: 'Zwycięstwo w konkursie fotograficznym „Tatrzańska Jesień 2010“',
    language: Language.polish,
    link: {
      href: 'https://z-ne.pl/s,doc,45400,1,1878.html',
      ariaLabel: "artykuł na temat konkursu",
      showIcon: true
    }
  },
  {
    icon: 'landscape',
    text: 'Hobby - turystyka górska, taternictwo, rower, fotografia',
    language: Language.polish,
  },
  {
    icon: 'language_gb_english',
    text: 'English - Level B2',
    language: Language.english,
  },
  {
    icon: 'school',
    text: 'Nearly 400 hours of courses on Udemy in .NET, Frontend, SQL, and Azure',
    language: Language.english,
    link: {
      href: 'https://udemycoursespp.web.app',
      ariaLabel: "website with my Udemy courses",
      showIcon: true
    }
  },
  {
    icon: 'trophy',
    text: 'Winner of the nationwide photography competition "Tatrzańska Jesień 2010"',
    language: Language.english,
    link: {
      href: 'https://z-ne.pl/s,doc,45400,1,1878.html',
      ariaLabel: "article about competition",
      showIcon: true
    }
  },
  {
    icon: 'landscape',
    text: 'Muntaineering, cycling, photography',
    language: Language.english
  },
];

export const PROFILE_INFO: IconTextItem[] = [
  {
    icon: 'lightbulb',
    text: 'Kreatywność',
    language: Language.polish,
  },
  {
    icon: 'forum',
    text: 'Komunikatywność',
    language: Language.polish,
  },
  {
    icon: 'groups',
    text: 'Praca zespołowa',
    language: Language.polish,
  },
  {
    icon: 'work',
    text: 'Zaangażowanie',
    language: Language.polish,
  },
  {
    icon: 'explore',
    text: 'Inicjatywa',
    language: Language.polish,
  },
  {
    icon: 'lightbulb',
    text: 'Creativity',
    language: Language.english,
  },
  {
    icon: 'forum',
    text: 'Communication skills',
    language: Language.english,
  },
  {
    icon: 'groups',
    text: 'Teamwork',
    language: Language.english,
  },
  {
    icon: 'work',
    text: 'Commitment',
    language: Language.english,
  },
  {
    icon: 'explore',
    text: 'Initiative',
    language: Language.english,
  },
];