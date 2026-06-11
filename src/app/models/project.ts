import { Localized } from './localized';

export interface Project {
  id: number;
  name: Localized<string>;
  description: Localized<string>;
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: { pl: 'Portal Pracowniczy', en: 'eHR' },
    description: {
      pl: 'Udział w międzyzespołowym projekcie. Implementowanie interfejsu użytkownika na podstawie wzorów przygotowanych w Figmie przez projektanta oraz czynny udział w procesie projektowania.',
      en: 'Participation in an inter-team project. Implementation of the user interface based on designs created in Figma by a designer and participation in the design process.',
    },
  },
  {
    id: 2,
    name: { pl: 'Kadry i Nota Płacowa', en: 'HR and Payroll' },
    description: {
      pl: 'Implementacja logiki biznesowej po stronie backendu (.NET) i frontendu (Angular). Prace utrzymaniowe i aktualizacyjne. Zautomatyzowanie procesu CI/CD oraz stworzenie środowiska testowego opartego na kontenerach Docker.',
      en: 'Implementation of business logic on both backend (.NET) and frontend (Angular). Maintenance and upgrades. Automation of the CI/CD process and creation of a test environment based on Docker containers.',
    },
  },
  {
    id: 3,
    name: {
      pl: 'Światłowodowy system monitorowania naprężeń górotworu',
      en: 'Fiber Optic Rock Strain Monitoring System',
    },
    description: {
      pl: 'Zaprojektowanie i implementacja aplikacji WebAPI .NET/SPA Angular oraz jej wdrożenie na serwer aplikacji IIS na kopalni KWK Ziemowit.',
      en: 'Designed and implemented a WebAPI .NET/SPA Angular application and deployed it on an IIS application server at KWK Ziemowit mine.',
    },
  },
  {
    id: 4,
    name: 'graniowki.pl',
    description: {
      pl: 'Stworzenie aplikacji internetowej do wyszukiwania tras graniowych w Tatrach Wysokich jako WebAPI .NET/SPA React, wdrożonej w chmurze Microsoft Azure.',
      en: 'Development of a web application for searching ridge climbing routes in the High Tatras as a WebAPI .NET/SPA React, deployed in the Microsoft Azure cloud.',
    },
    href: 'https://graniowki.pl',
  },
];
