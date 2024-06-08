import {
    BudinoAllaVanigliaConMaizenaEN,
    BudinoAllaVanigliaConMaizenaIT, BudinoAllaVanigliaConMaizenaPL
} from "./BudinoAllaVanigliaConMaizena";
import {ZucchineRipieneEN, ZucchineRipieneIT, ZucchineRipienePL} from "./ZucchineRipiene";
import {PaniniNapoletaniEN, PaniniNapoletaniIT, PaniniNapoletaniPL} from "./PaniniNapoletani";
import {ENGLISH, ITALIAN, POLISH} from "../../logic/Names";
import {getRecipeTitle} from "../../logic/Functions";
import {PancakeAllaBananaEN, PancakeAllaBananaIT, PancakeAllaBananaPL} from "./PancakeAllaBanana";

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
    { code: 3, name: getRecipeTitle(PancakeAllaBananaPL), language: POLISH, text: PancakeAllaBananaPL}
]

