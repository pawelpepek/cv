import { Language } from "./language";
import { Translatable } from "./translatable";

export interface TranslatableInfo extends Translatable {
    header: string;
    text: string;
}

export const ABOUT_ME: TranslatableInfo[] = [
    {
        header: "Full-stack developer z dużym doświadczeniem w technologiach .NET, Angular i React.",
        text: "Jestem kreatywnym, zaangażowanym i ceniącym pracę zespołową profesjonalistą. Skupiam się na ciągłym rozwoju, pogłębianiu wiedzy oraz doskonaleniu umiejętności w tworzeniu nowoczesnych aplikacji webowych.",
        language: Language.polish,
    },
    {
        header: "Full-stack developer with extensive experience in .NET, Angular, and React.",
        text: "I am a creative and dedicated professional who values teamwork. The most important thing for me is to continuously grow and improve my skills in developing modern web applications.",
        language: Language.english,
    }
]
