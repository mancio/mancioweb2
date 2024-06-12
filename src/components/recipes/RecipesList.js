import {BudinoAllaVanigliaConMaizenaList} from "./BudinoAllaVanigliaConMaizena";
import {ITALIAN} from "../../logic/Names";
import {CremaMascarponeList} from "./CremaMascarpone";

export const recipeModel = BudinoAllaVanigliaConMaizenaList;
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

