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
  extraLinks?: { href: string; ariaLabel: string }[];
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
    icon: 'M260.4 249.8L260.4 201.2C260.4 197.1 261.9 194 265.5 192L363.3 135.7C376.6 128 392.5 124.4 408.9 124.4C470.3 124.4 509.3 172 509.3 222.7C509.3 226.3 509.3 230.4 508.8 234.5L407.3 175.1C401.2 171.5 395 171.5 388.9 175.1L260.4 249.8zM488.7 439.2L488.7 323C488.7 315.8 485.6 310.7 479.5 307.1L351 232.4L393 208.3C396.6 206.3 399.7 206.3 403.2 208.3L501 264.7C529.2 281.1 548.1 315.9 548.1 349.7C548.1 388.6 525.1 424.5 488.7 439.3L488.7 439.3zM230.2 336.8L188.2 312.2C184.6 310.2 183.1 307.1 183.1 303L183.1 190.4C183.1 135.6 225.1 94.1 281.9 94.1C303.4 94.1 323.4 101.3 340.3 114.1L239.4 172.5C233.3 176.1 230.2 181.2 230.2 188.4L230.2 336.9L230.2 336.9zM320.6 389L260.4 355.2L260.4 283.5L320.6 249.7L380.8 283.5L380.8 355.2L320.6 389zM359.3 544.7C337.8 544.7 317.8 537.5 300.9 524.7L401.8 466.3C407.9 462.7 411 457.6 411 450.4L411 301.9L453.5 326.5C457.1 328.5 458.6 331.6 458.6 335.7L458.6 448.3C458.6 503.1 416.1 544.6 359.3 544.6L359.3 544.6zM237.8 430.5L140.1 374.2C111.9 357.8 93 323 93 289.2C93 249.8 116.6 214.4 152.9 199.6L152.9 316.3C152.9 323.5 156 328.6 162.1 332.2L290.1 406.4L248.1 430.5C244.5 432.5 241.4 432.5 237.9 430.5zM232.2 514.5C174.3 514.5 131.8 471 131.8 417.2C131.8 413.1 132.3 409 132.8 404.9L233.7 463.3C239.8 466.9 246 466.9 252.1 463.3L380.6 389.1L380.6 437.7C380.6 441.8 379.1 444.9 375.5 446.9L277.7 503.2C264.4 510.9 248.5 514.5 232.1 514.5L232.1 514.5zM359.2 575.4C421.2 575.4 472.9 531.4 484.6 473C541.9 458.1 578.8 404.4 578.8 349.6C578.8 313.8 563.4 278.9 535.8 253.9C538.4 243.1 539.9 232.4 539.9 221.6C539.9 148.4 480.5 93.6 411.9 93.6C398.1 93.6 384.8 95.6 371.5 100.3C348.5 77.8 316.7 63.4 281.9 63.4C219.9 63.4 168.2 107.4 156.5 165.8C99.2 180.6 62.3 234.4 62.3 289.2C62.3 325 77.7 359.9 105.3 384.9C102.7 395.7 101.2 406.4 101.2 417.2C101.2 490.4 160.6 545.2 229.2 545.2C243 545.2 256.3 543.2 269.6 538.5C292.6 561 324.4 575.4 359.2 575.4z',
    iconVersion: 'svg',
    text: 'Codex, Claude Code',
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
    text: 'Azure, AWS, Supabase, Firebase',
    break: true,
  },
  {
    icon: 'developer_mode_tv',
    text: 'VS, VS Code, Webstorm',
  },
  {
    icon: 'github',
    iconVersion: 'brands',
    text: 'Git, GitLab, GitHub',
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
    extraLinks: [
      { href: 'assets/img/B21.jpg', ariaLabel: 'Certyfikat B2.1' },
      { href: 'assets/img/B13.jpg', ariaLabel: 'Certyfikat B1.3' },
    ]
  },
  {
    icon: 'school',
    text: 'Ponad 400 godzin kursów Udemy na temat programowania, baz danych itp.',
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
    text: 'Hobby - turystyka górska, rower, fotografia',
    language: Language.polish,
  },
  {
    icon: 'language_gb_english',
    text: 'English - Level B2',
    language: Language.english,
    extraLinks: [
      { href: 'assets/img/B21.jpg', ariaLabel: 'Certificate B2.1' },
      { href: 'assets/img/B13.jpg', ariaLabel: 'Certificate B1.3' },
    ]
  },
  {
    icon: 'school',
    text: 'Over 400 hours of courses on Udemy in coding, databases and other topics',
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