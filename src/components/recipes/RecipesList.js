import {BudinoAllaVanigliaConMaizena} from "./BudinoAllaVanigliaConMaizena";
import {ZucchineRipiene, ZucchineRipieneIT} from "./ZucchineRipiene";
import {PaniniNapoletani} from "./PaniniNapoletani";
import {ITALIAN} from "../../logic/Names";

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
    ...BudinoAllaVanigliaConMaizena,
    ...ZucchineRipiene,
    ...PaniniNapoletani
]