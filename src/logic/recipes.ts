import {RECIPES} from "./Names";
import {recipes, recipesById} from "../data/recipes";
import type {Language, Recipe, RecipePicture, RecipeTranslation} from "../data/recipes/types";

export type {Language, Recipe, RecipePicture, RecipeTranslation};

export interface RecipeMatch {
    recipe: Recipe;
    language: Language;
    translation: RecipeTranslation;
}

export function removeSpaceLowerCaseString(str: string): string {
    return str.replace(/\s+/g, '').toLowerCase();
}

export function getTranslation(recipe: Recipe, language: Language): RecipeTranslation {
    return recipe.i18n[language];
}

export function getPictures(recipe: Recipe, language: Language): RecipePicture[] {
    return recipe.i18n[language].pictures ?? recipe.pictures;
}

/** Hero image is index 0; step N is illustrated by index N + 1. */
export function findPictureUrl(recipe: Recipe, language: Language, index: number): string | undefined {
    return getPictures(recipe, language).find(p => p.index === index)?.url;
}

export function getRecipeSlug(recipe: Recipe, language: Language): string {
    return removeSpaceLowerCaseString(recipe.i18n[language].title);
}

export function getRecipesByLangText(language: Language, text: string): string[] {
    const partName = text.toLowerCase();
    return recipes
        .map(recipe => recipe.i18n[language].title)
        .filter(title => title.toLowerCase().includes(partName));
}

export function findRecipeByUrl(recipeURL: string): RecipeMatch | undefined {
    const normalized = removeSpaceLowerCaseString(recipeURL);
    for (const recipe of recipes) {
        for (const language of Object.keys(recipe.i18n) as Language[]) {
            if (getRecipeSlug(recipe, language) === normalized) {
                return {recipe, language, translation: recipe.i18n[language]};
            }
        }
    }
    return undefined;
}

export function getRecipeURLByIdAndLanguage(id: number, language: Language): string {
    const recipe = recipesById.get(id);
    if (!recipe) return RECIPES;
    return `${RECIPES}/${getRecipeSlug(recipe, language)}`;
}

export function changeIngredientQuantity(ingredient: string, multiplier: number): string {
    const regex = /(\d+\/\d+|\d+(\.\d+)?)/;
    const match = ingredient.match(regex);
    if (!match) return ingredient;

    const raw = match[0];
    const quantity = raw.includes('/')
        ? (() => {
            const [numerator, denominator] = raw.split('/').map(Number);
            return numerator / denominator;
        })()
        : parseFloat(raw);

    const updated = quantity * multiplier;
    const formatted = updated % 1 === 0 ? String(Math.round(updated)) : updated.toFixed(1);
    return ingredient.replace(regex, formatted);
}

export function sortArrayOfStringsAlphabetically(stringsArray: string[]): string[] {
    return stringsArray.slice().sort((a, b) => a.localeCompare(b));
}
