import { Localized } from './localized';

export interface AboutMe {
    header: Localized<string>;
    text: Localized<string>;
}

export const ABOUT_ME: AboutMe = {
    header: {
        pl: 'Full-stack developer z ponad 8-letnim doświadczeniem w tworzeniu i utrzymaniu aplikacji biznesowych. Specjalizuję się w .NET, Angular i React; mam doświadczenie w systemach finansowych, HR/payroll, wdrożeniach produkcyjnych oraz automatyzacji CI/CD. Aktywnie wykorzystuję podejście agentic coding w procesie tworzenia oprogramowania.',
        en: 'Full-stack developer with over 8 years of experience building and maintaining business applications. I specialize in .NET, Angular, and React, with experience in financial and HR/payroll systems, production deployments, and CI/CD automation. Actively leverage agentic coding in the software development process.',
    },
    text: {
        pl: 'Jestem kreatywnym, zaangażowanym i ceniącym pracę zespołową profesjonalistą. Skupiam się na ciągłym rozwoju, pogłębianiu wiedzy oraz doskonaleniu umiejętności w tworzeniu nowoczesnych aplikacji webowych.',
        en: 'I am a creative and dedicated professional who values teamwork. The most important thing for me is to continuously grow and improve my skills in developing modern web applications.',
    },
}
