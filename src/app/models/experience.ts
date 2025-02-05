import { Language } from "./language";
import { Translatable } from "./translatable";

export enum Sector {
  finance,
  programming,
}

export interface Experience extends Translatable {
  id: number;
  period: string;
  position: string;
  description: string;
  sector: Sector;
  company: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    period: 'XI 2024 - nadal',
    position: 'Programista',
    sector: Sector.programming,
    description:
      'Rozwój i utrzymywanie oprogramowania w technologiach .NET/Angular w zespole Kadry/Płace. Udoskonalanie dobrych praktyk i organizacji pracy.',
    company: 'Rekord SI',
    language: Language.polish,
  },
  {
    id: 2,
    period: 'V 2022 - X 2024',
    position: 'Programista aplikacji',
    sector: Sector.programming,
    description:
      'Tworzenie SPA .NET/Angular, EF Core (MSSQL, PostgreSQL, SQLite), wdrażanie aplikacji na środowiska produkcyjne oraz utrzymanie aplikacji Scada WPF .NET.',
    company: 'Carboautomatyka',
    language: Language.polish,
  },
  {
    id: 3,
    period: 'VIII 2014 – IX 2022',
    position: 'Współwłaściciel',
    sector: Sector.programming,
    description:
      'Tworzenie systemu finansowo-księgowego i pomiaru ryzyka dla funduszy inwestycyjnych i jego rozwój początkowo za pomocą VBA MS Excel, a od początku 2018 roku w technologii Winforms .NET C#.',
    company: 'Riskout Sp. z o.o.',
    language: Language.polish,
  },
  {
    id: 4,
    period: 'I 2010 - VI 2014',
    position: 'Specjalista ds. ryzyka',
    sector: Sector.finance,
    description:
      'Automatyzacja raportowania Excel/VBA i tworzenie modeli zarzadzania ryzykiem.',
    company: 'Dom Maklerski IDM S.A.',
    language: Language.polish,
  },
  {
    id: 5,
    period: 'VII 2008 - IX 2009',
    position: 'Referent ds. zarządzania ryzykiem',
    sector: Sector.finance,
    description:
      'Automatyzacja raportowania oraz tworzenie modeli przy pomocy VBA w Excelu.',
    company: 'Tele-Fonika Kable',
    language: Language.polish,
  },
  {
    id: 6,
    period: 'XII 2007 - III 2008',
    position: 'Młodszy Księgowy',
    sector: Sector.programming,
    description: 'Uzgadnianie kont, administrowanie bazą danych klientów.',
    company: 'Capgemini Polska',
    language: Language.polish,
  },
  {
    id: 11,
    period: 'XI 2024 - still',
    position: 'Developer',
    sector: Sector.programming,
    description:
      'Development and maintenance of software in .NET/Angular technologies within the HR/Payroll team. Improving best practices and work organization.',
    company: 'Rekord SI',
    language: Language.english,
  },
  {
    id: 12,
    period: 'V 2022 - X 2024',
    position: 'Application Developer',
    sector: Sector.programming,
    description:
      'Creating SPA using .NET/Angular, EF Core (MSSQL, PostgreSQL, SQLite), deploying applications to production environments, and maintaining SCADA applications in WPF .NET.',
    company: 'Carboautomatyka',
    language: Language.english,
  },
  {
    id: 13,
    period: 'VIII 2014 - IX 2022',
    position: 'Co-owner',
    sector: Sector.programming,
    description:
      'Development of a financial and accounting system and risk measurement tool for investment funds. Initially created using VBA in MS Excel, and from 2018, developed in WinForms .NET C#.',
    company: 'Riskout Sp. z o.o.',
    language: Language.english,
  },
  {
    id: 14,
    period: 'I 2010 - VI 2014',
    position: 'Risk Specialist',
    sector: Sector.finance,
    description:
      'Automate Excel/VBA reporting and build risk management models.',
    company: 'Dom Maklerski IDM S.A.',
    language: Language.english,
  },
  {
    id: 15,
    period: 'VII 2008 - IX 2009',
    position: 'Risk Management Consultant',
    sector: Sector.finance,
    description:
      'Reporting automation (Excel/VBA), financial and statistical modeling.',
    company: 'Tele-Fonika Kable',
    language: Language.english,
  },
  {
    id: 16,
    period: 'XII 2007 - III 2008',
    position: 'Junior Accountant',
    sector: Sector.programming,
    description: 'Account reconciliation, customer database administration.',
    company: 'Capgemini Polska',
    language: Language.english,
  },
];
