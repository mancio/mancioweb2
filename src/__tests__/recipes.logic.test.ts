import {
    changeIngredientQuantity,
    findRecipeByUrl,
    getRecipeSlug,
    getRecipeURLByIdAndLanguage,
    getRecipesByLangText,
    removeSpaceLowerCaseString,
    sortArrayOfStringsAlphabetically,
} from "../logic/recipes";
import {recipes} from "../data/recipes";
import {LANGUAGES} from "../data/recipes/types";
import {RECIPES} from "../logic/Names";

describe('changeIngredientQuantity', () => {
    test('scales a whole number', () => {
        expect(changeIngredientQuantity('320 gr di spaghetti', 2)).toBe('640 gr di spaghetti');
    });

    test('scales a decimal and keeps one decimal place', () => {
        expect(changeIngredientQuantity('1.5 litri di latte', 3)).toBe('4.5 litri di latte');
    });

    test('produces a whole number when the result has no fraction', () => {
        expect(changeIngredientQuantity('2 uova', 1.5)).toBe('3 uova');
    });

    test('produces one decimal place when the result is fractional', () => {
        expect(changeIngredientQuantity('5 gr di sale', 1.5)).toBe('7.5 gr di sale');
    });

    test('scales a fraction', () => {
        expect(changeIngredientQuantity('1/2 cucchiaino', 4)).toBe('2 cucchiaino');
    });

    test('leaves ingredients without a number untouched', () => {
        expect(changeIngredientQuantity('sale q.b.', 5)).toBe('sale q.b.');
    });

    test('only replaces the first number', () => {
        expect(changeIngredientQuantity('2 fette da 100 gr', 2)).toBe('4 fette da 100 gr');
    });
});

describe('removeSpaceLowerCaseString', () => {
    test('strips whitespace and lowercases', () => {
        expect(removeSpaceLowerCaseString('Spaghetti alla Carbonara')).toBe('spaghettiallacarbonara');
    });
});

describe('getRecipesByLangText', () => {
    test('returns every recipe when the search term is empty', () => {
        expect(getRecipesByLangText('IT', '')).toHaveLength(recipes.length);
    });

    test('filters case-insensitively', () => {
        const results = getRecipesByLangText('IT', 'CARBONARA');
        expect(results).toContain('Spaghetti alla Carbonara');
        expect(results).toHaveLength(1);
    });

    test('returns titles in the requested language only', () => {
        expect(getRecipesByLangText('EN', 'carbonara')).toContain('Spaghetti Carbonara');
        expect(getRecipesByLangText('EN', 'carbonara')).not.toContain('Spaghetti alla Carbonara');
    });

    test('returns nothing for an unmatched term', () => {
        expect(getRecipesByLangText('IT', 'zzzznotarecipe')).toHaveLength(0);
    });
});

describe('findRecipeByUrl', () => {
    test('resolves every recipe slug in every language', () => {
        for (const recipe of recipes) {
            for (const language of LANGUAGES) {
                const match = findRecipeByUrl(getRecipeSlug(recipe, language));
                expect(match).toBeDefined();
                expect(match!.recipe.id).toBe(recipe.id);
                expect(match!.language).toBe(language);
            }
        }
    });

    test('returns undefined for an unknown slug', () => {
        expect(findRecipeByUrl('not-a-real-recipe')).toBeUndefined();
    });

    test('returns undefined for an empty slug', () => {
        expect(findRecipeByUrl('')).toBeUndefined();
    });
});

describe('getRecipeURLByIdAndLanguage', () => {
    test('round-trips through every language', () => {
        for (const recipe of recipes) {
            for (const language of LANGUAGES) {
                const url = getRecipeURLByIdAndLanguage(recipe.id, language);
                const slug = url.replace(`${RECIPES}/`, '');
                const match = findRecipeByUrl(slug);
                expect(match!.recipe.id).toBe(recipe.id);
                expect(match!.language).toBe(language);
            }
        }
    });

    test('falls back to the recipes index for an unknown id', () => {
        expect(getRecipeURLByIdAndLanguage(9999, 'IT')).toBe(RECIPES);
    });
});

describe('sortArrayOfStringsAlphabetically', () => {
    test('sorts without mutating the input', () => {
        const input = ['pera', 'Ananas', 'banana'];
        const sorted = sortArrayOfStringsAlphabetically(input);
        expect(sorted).toEqual(['Ananas', 'banana', 'pera']);
        expect(input).toEqual(['pera', 'Ananas', 'banana']);
    });
});
