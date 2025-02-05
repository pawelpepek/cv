import { Language } from "./language";
import { Translatable } from "./translatable";

export interface Education extends Translatable {
    data: string[]
}

export const EDUCATIONS: Education[] = [
    {
        data: [
            "2002 - 2007",
            "Uniwersytet Jagielloński",
            "Wydział Matematyki i Informatyki", "Dyplom magistra matematyki"
        ],
        language: Language.polish
    },
    {
        data: [
            "2002 - 2007",
            "Jagiellonian University",
            "Faculty of Mathematics",
            "and Computer Science",
            "Master's degree in mathematics"
        ],
        language: Language.english
    },
]