import {
    BudinoAllaVanigliaConMaizenaEN,
    BudinoAllaVanigliaConMaizenaIT, BudinoAllaVanigliaConMaizenaPL
} from "./BudinoAllaVanigliaConMaizena";
import {ZucchineRipieneEN, ZucchineRipieneIT, ZucchineRipienePL} from "./ZucchineRipiene";
import {PaniniNapoletaniEN, PaniniNapoletaniIT, PaniniNapoletaniPL} from "./PaniniNapoletani";
import {ITALIAN} from "../../logic/Names";
import {getRecipeTitle} from "../../logic/Functions";
import {PancakeAllaBananaEN, PancakeAllaBananaIT} from "./PancakeAllaBanana";

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
    { code: 0, name: getRecipeTitle(BudinoAllaVanigliaConMaizenaIT), language: "IT", text: BudinoAllaVanigliaConMaizenaIT},
    { code: 0, name: getRecipeTitle(BudinoAllaVanigliaConMaizenaEN), language: "EN", text: BudinoAllaVanigliaConMaizenaEN},
    { code: 0, name: getRecipeTitle(BudinoAllaVanigliaConMaizenaPL), language: "PL", text: BudinoAllaVanigliaConMaizenaPL},
    { code: 1, name: getRecipeTitle(PaniniNapoletaniIT), language: "IT", text: PaniniNapoletaniIT},
    { code: 1, name: getRecipeTitle(PaniniNapoletaniEN), language: "EN", text: PaniniNapoletaniEN},
    { code: 1, name: getRecipeTitle(PaniniNapoletaniPL), language: "PL", text: PaniniNapoletaniPL},
    { code: 2, name: getRecipeTitle(ZucchineRipieneIT), language: "IT", text: ZucchineRipieneIT},
    { code: 2, name: getRecipeTitle(ZucchineRipieneEN), language: "EN", text: ZucchineRipieneEN},
    { code: 2, name: getRecipeTitle(ZucchineRipienePL), language: "PL", text: ZucchineRipienePL},
    { code: 3, name: getRecipeTitle(PancakeAllaBananaIT), language: "IT", text: PancakeAllaBananaIT},
    { code: 3, name: getRecipeTitle(PancakeAllaBananaEN), language: "EN", text: PancakeAllaBananaEN}
]

