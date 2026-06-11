import { Localized } from './localized';

export interface AboutMe {
    header: Localized<string>;
    text: Localized<string>;
}

export const ABOUT_ME: AboutMe = {
    header: {
        pl: 'Full‑stack developer z dużym doświadczeniem w technologiach .NET, Angular i React, aktywnie korzystający z agentic coding.',
        en: 'Full-stack developer with extensive experience in .NET, Angular, and React, actively using agentic coding.',
    },
    text: {
        pl: 'Jestem kreatywnym, zaangażowanym i ceniącym pracę zespołową profesjonalistą. Skupiam się na ciągłym rozwoju, pogłębianiu wiedzy oraz doskonaleniu umiejętności w tworzeniu nowoczesnych aplikacji webowych.',
        en: 'I am a creative and dedicated professional who values teamwork. The most important thing for me is to continuously grow and improve my skills in developing modern web applications.',
    },
}
