import {
    BudinoAllaVanigliaConMaizenaEN,
    BudinoAllaVanigliaConMaizenaIT, BudinoAllaVanigliaConMaizenaPL
} from "./BudinoAllaVanigliaConMaizena";
import {ZucchineRipieneEN, ZucchineRipieneIT, ZucchineRipienePL} from "./ZucchineRipiene";
import {PaniniNapoletaniEN, PaniniNapoletaniIT, PaniniNapoletaniPL} from "./PaniniNapoletani";
import {ENGLISH, ITALIAN, POLISH} from "../../logic/Names";
import {getRecipeTitle} from "../../logic/Functions";
import {PancakeAllaBananaEN, PancakeAllaBananaIT, PancakeAllaBananaPL} from "./PancakeAllaBanana";
import {
    PaccheriCremaBurrataPancettaEN,
    PaccheriCremaBurrataPancettaIT,
    PaccheriCremaBurrataPancettaPL
} from "./PaccheriCremaBurrataPancetta";
import {RisottoZafferanoEN, RisottoZafferanoIT, RisottoZafferanoPL} from "./RisottoZafferano";
import {PannaCottaFragoleEN, PannaCottaFragoleIT, PannaCottaFragolePL} from "./PannaCottaFragole";

export const recipeModel = { code: 1, name: "", language: ITALIAN, text: ZucchineRipieneIT};
export const recipeDataModel = {
    language: ITALIAN,
    name: "recipeName",
    servings: "servings",
    ingredients: [""],
    steps: [""],
    notes: "notes",
    pictures: [{ number: 0, url: "https:....." }],
    video: "url"
};


export const recipeFullList = [
    { code: 0, name: getRecipeTitle(BudinoAllaVanigliaConMaizenaIT), language: ITALIAN, text: BudinoAllaVanigliaConMaizenaIT},
    { code: 0, name: getRecipeTitle(BudinoAllaVanigliaConMaizenaEN), language: ENGLISH, text: BudinoAllaVanigliaConMaizenaEN},
    { code: 0, name: getRecipeTitle(BudinoAllaVanigliaConMaizenaPL), language: POLISH, text: BudinoAllaVanigliaConMaizenaPL},

    { code: 1, name: getRecipeTitle(PaniniNapoletaniIT), language: ITALIAN, text: PaniniNapoletaniIT},
    { code: 1, name: getRecipeTitle(PaniniNapoletaniEN), language: ENGLISH, text: PaniniNapoletaniEN},
    { code: 1, name: getRecipeTitle(PaniniNapoletaniPL), language: POLISH, text: PaniniNapoletaniPL},

    { code: 2, name: getRecipeTitle(ZucchineRipieneIT), language: ITALIAN, text: ZucchineRipieneIT},
    { code: 2, name: getRecipeTitle(ZucchineRipieneEN), language: ENGLISH, text: ZucchineRipieneEN},
    { code: 2, name: getRecipeTitle(ZucchineRipienePL), language: POLISH, text: ZucchineRipienePL},

    { code: 3, name: getRecipeTitle(PancakeAllaBananaIT), language: ITALIAN, text: PancakeAllaBananaIT},
    { code: 3, name: getRecipeTitle(PancakeAllaBananaEN), language: ENGLISH, text: PancakeAllaBananaEN},
    { code: 3, name: getRecipeTitle(PancakeAllaBananaPL), language: POLISH, text: PancakeAllaBananaPL},

    { code: 4, name: getRecipeTitle(PaccheriCremaBurrataPancettaIT), language: ITALIAN, text: PaccheriCremaBurrataPancettaIT},
    { code: 4, name: getRecipeTitle(PaccheriCremaBurrataPancettaEN), language: ENGLISH, text: PaccheriCremaBurrataPancettaEN},
    { code: 4, name: getRecipeTitle(PaccheriCremaBurrataPancettaPL), language: POLISH, text: PaccheriCremaBurrataPancettaPL},

    { code: 5, name: getRecipeTitle(RisottoZafferanoIT), language: ITALIAN, text: RisottoZafferanoIT},
    { code: 5, name: getRecipeTitle(RisottoZafferanoEN), language: ENGLISH, text: RisottoZafferanoEN},
    { code: 5, name: getRecipeTitle(RisottoZafferanoPL), language: POLISH, text: RisottoZafferanoPL},

    { code: 6, name: getRecipeTitle(PannaCottaFragoleIT), language: ITALIAN, text: PannaCottaFragoleIT},
    { code: 6, name: getRecipeTitle(PannaCottaFragoleEN), language: ENGLISH, text: PannaCottaFragoleEN},
    { code: 6, name: getRecipeTitle(PannaCottaFragolePL), language: POLISH, text: PannaCottaFragolePL},
]

