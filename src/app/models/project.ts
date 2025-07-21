import { Language } from "./language";
import { Translatable } from "./translatable";

export interface Project extends Translatable {
  id: number;
  name: string;
  description: string;
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Portal Pracowniczy',
    description:
      'Udział w międzyzespołowym projekcie. Implementowanie interfejsu użytkownika na podstawie wzorów przygotowanych w Figmie przez projektanta oraz czynny udział w procesie projektowania.',
    language: Language.polish,
  },
  {
    id: 2,
    name: 'Kadry i Nota Płacowa',
    description:
      'Implementacja logiki biznesowej po stronie backendu (.NET) i frontendu (Angular). Prace utrzymaniowe i aktualizacyjne. Zautomatyzowanie procesu CI/CD oraz stworzenie środowiska testowego opartego na kontenerach Docker.',
    language: Language.polish,
  },
  {
    id: 3,
    name: 'Światłowodowy system monitorowania naprężeń górotworu',
    description:
      'Zaprojektowanie i implementacja aplikacji WebAPI .NET/SPA Angular oraz jej wdrożenie na serwer aplikacji IIS na kopalni KWK Ziemowit.',
    language: Language.polish
  },
  {
    id: 4,
    name: 'graniowki.pl',
    description:
      'Stworzenie aplikacji internetowej do wyszukiwania tras graniowych w Tatrach Wysokich jako WebAPI .NET/SPA React, wdrożonej w chmurze Microsoft Azure.',
    language: Language.polish,
    href: "https://graniowki.pl"
  },
  {
    id: 11,
    name: 'eHR',
    description:
      'Participation in an inter-team project. Implementation of the user interface based on designs created in Figma by a designer and participation in the design process.',
    language: Language.english,
  },
  {
    id: 12,
    name: 'HR and Payroll',
    description:
      'Implementation of business logic on both backend (.NET) and frontend (Angular). Maintenance and upgrades. Automation of the CI/CD process and creation of a test environment based on Docker containers.',
    language: Language.english,
  },
  {
    id: 13,
    name: 'Fiber Optic Rock Strain Monitoring System',
    description:
      'Designed and implemented a WebAPI .NET/SPA Angular application and deployed it on an IIS application server at KWK Ziemowit mine.',
    language: Language.english
  },
  {
    id: 14,
    name: 'graniowki.pl',
    description:
      'Development of a web application for searching ridge climbing routes in the High Tatras as a WebAPI .NET/SPA React, deployed in the Microsoft Azure cloud.',
    language: Language.english,
    href: "https://graniowki.pl"
  },
];
