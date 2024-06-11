import {BudinoAllaVanigliaConMaizenaList} from "./BudinoAllaVanigliaConMaizena";
import {ZucchineRipieneIT} from "./ZucchineRipiene";
import {ITALIAN} from "../../logic/Names";
import {CremaMascarponeList} from "./CremaMascarpone";

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
    BudinoAllaVanigliaConMaizenaList,
    CremaMascarponeList
]

