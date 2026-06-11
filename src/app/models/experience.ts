import { Localized } from './localized';

export enum Sector {
  finance,
  programming,
}

export interface Experience {
  id: number;
  period: Localized<string>;
  position: Localized<string>;
  description: Localized<string>;
  sector: Sector;
  company: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    period: { pl: 'XI 2024 - nadal', en: 'XI 2024 - present' },
    position: { pl: 'Programista', en: 'Developer' },
    sector: Sector.programming,
    description: {
      pl: 'Rozwój i utrzymywanie oprogramowania w technologiach .NET/Angular w zespole Kadry/Płace. Udoskonalanie dobrych praktyk i organizacji pracy.',
      en: 'Development and maintenance of software in .NET/Angular technologies within the HR/Payroll team. Improving best practices and work organization.',
    },
    company: 'Rekord SI',
  },
  {
    id: 2,
    period: 'V 2022 - X 2024',
    position: { pl: 'Programista aplikacji', en: 'Application Developer' },
    sector: Sector.programming,
    description: {
      pl: 'Tworzenie SPA .NET/Angular, EF Core (MSSQL, PostgreSQL, SQLite), wdrażanie aplikacji na środowiska produkcyjne oraz utrzymanie aplikacji Scada WPF .NET.',
      en: 'Creating SPA using .NET/Angular, EF Core (MSSQL, PostgreSQL, SQLite), deploying applications to production environments, and maintaining SCADA applications in WPF .NET.',
    },
    company: 'Carboautomatyka',
  },
  {
    id: 3,
    period: 'VIII 2014 – IX 2022',
    position: { pl: 'Współwłaściciel', en: 'Co-owner' },
    sector: Sector.programming,
    description: {
      pl: 'Tworzenie systemu finansowo-księgowego i pomiaru ryzyka dla funduszy inwestycyjnych i jego rozwój początkowo za pomocą VBA MS Excel, a od początku 2018 roku w technologii Winforms .NET C#.',
      en: 'Development of a financial and accounting system and risk measurement tool for investment funds. Initially created using VBA in MS Excel, and from 2018, developed in WinForms .NET C#.',
    },
    company: 'Riskout Sp. z o.o.',
  },
  {
    id: 4,
    period: 'I 2010 - VI 2014',
    position: { pl: 'Specjalista ds. ryzyka', en: 'Risk Specialist' },
    sector: Sector.finance,
    description: {
      pl: 'Automatyzacja raportowania Excel/VBA i tworzenie modeli zarządzania ryzykiem.',
      en: 'Automate Excel/VBA reporting and build risk management models.',
    },
    company: 'Dom Maklerski IDM S.A.',
  },
  {
    id: 5,
    period: 'VII 2008 - IX 2009',
    position: { pl: 'Referent ds. zarządzania ryzykiem', en: 'Risk Management Consultant' },
    sector: Sector.finance,
    description: {
      pl: 'Automatyzacja raportowania oraz tworzenie modeli przy pomocy VBA w Excelu.',
      en: 'Reporting automation (Excel/VBA), financial and statistical modeling.',
    },
    company: 'Tele-Fonika Kable',
  },
  {
    id: 6,
    period: 'XII 2007 - III 2008',
    position: { pl: 'Młodszy Księgowy', en: 'Junior Accountant' },
    sector: Sector.programming,
    description: {
      pl: 'Uzgadnianie kont, administrowanie bazą danych klientów.',
      en: 'Account reconciliation, customer database administration.',
    },
    company: 'Capgemini Polska',
  },
];
