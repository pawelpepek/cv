import { Language } from "./language";
import { Translatable } from "./translatable";

export interface TranslatableInfo extends Translatable {
    header: string;
    text: string;
}

export const ABOUT_ME: TranslatableInfo[] = [
    {
        header: "Full-stack developer z dużym doświadczeniem w technologiach .NET, Angular i React.",
        text: "Jestem osobą kreatywną i zaangażowaną, ceniącą współpracę zespołową. Skupiam się na ciągłym rozwoju, pogłębianiu wiedzy oraz doskonaleniu umiejętności w tworzeniu nowoczesnych aplikacji webowych.",
        language: Language.polish,
    },
    {
        header: "Full-stack developer with extensive experience in .NET, Angular, and React.",
        text: "I am a creative and dedicated professional who values team collaboration. I focus on continuous development, expanding my knowledge, and improving my skills in building modern web applications.",
        language: Language.english,
    }
]
