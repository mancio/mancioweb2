import {focacciaInPadella} from "../data/recipes/FocacciaInPadella";
import {findRecipeByUrl, getRecipeSlug} from "../logic/recipes";
import {LANGUAGES} from "../data/recipes/types";

test('is available in all three languages', () => {
    for (const language of LANGUAGES) {
        expect(focacciaInPadella.i18n[language]).toBeDefined();
    }
});

test('keeps the source quantities unchanged in every language', () => {
    const quantities = ['300', '160', '15', '5', '6', '150', '100'];
    for (const language of LANGUAGES) {
        const ingredients = focacciaInPadella.i18n[language].ingredients;
        expect(ingredients).toHaveLength(7);
        ingredients.forEach((ingredient, i) => {
            expect(ingredient).toContain(quantities[i]);
        });
    }
});

test('italian ingredients match the source text verbatim', () => {
    expect(focacciaInPadella.i18n.IT.ingredients).toEqual([
        "300g di farina 00",
        "160g di acqua",
        "15g di olio e.v.o.",
        "5g di sale",
        "6g di lievito chimico istantaneo per torte salate",
        "150g di prosciutto cotto",
        "100g di formaggio a scelta (io ho scelto il taleggio)",
    ]);
});

test('has the same number of steps in every language', () => {
    for (const language of LANGUAGES) {
        expect(focacciaInPadella.i18n[language].steps).toHaveLength(5);
    }
});

test('preserves the cooking times and pan size across translations', () => {
    for (const language of LANGUAGES) {
        const steps = focacciaInPadella.i18n[language].steps.join(' ');
        expect(steps).toContain('3mm');
        expect(steps).toContain('24-26 cm');
        expect(steps).toContain('10 min');
        expect(steps).toContain('5-7 min');
        expect(steps).toContain('5 min');
    }
});

test('links the source video and has no pictures', () => {
    expect(focacciaInPadella.video).toBe('https://www.youtube.com/shorts/0NxNKzMVEH8');
    expect(focacciaInPadella.pictures).toHaveLength(0);
});

test('is reachable by its slug in every language', () => {
    for (const language of LANGUAGES) {
        const match = findRecipeByUrl(getRecipeSlug(focacciaInPadella, language));
        expect(match).toBeDefined();
        expect(match!.recipe.key).toBe('focacciaInPadella');
    }
});
