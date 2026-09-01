import {recipes, recipesById} from "../data/recipes";
import {LANGUAGES} from "../data/recipes/types";
import {getPictures, getRecipeSlug} from "../logic/recipes";

test('every recipe has all three languages with content', () => {
    for (const recipe of recipes) {
        for (const language of LANGUAGES) {
            const t = recipe.i18n[language];
            expect(t).toBeDefined();
            expect(t.title.trim()).not.toBe('');
            expect(t.servings.trim()).not.toBe('');
            expect(t.ingredients.length).toBeGreaterThan(0);
            expect(t.steps.length).toBeGreaterThan(0);
            expect(t.ingredients.every(i => i.trim() !== '')).toBe(true);
            expect(t.steps.every(s => s.trim() !== '')).toBe(true);
        }
    }
});

// Some translations gained or lost a line before this data was ever typed. The counts are
// snapshotted rather than asserted equal so the existing content stays untouched, while any
// NEW divergence shows up as a failing diff.
test('cross-language count mismatches stay limited to the known set', () => {
    const mismatches = recipes
        .map(recipe => ({
            key: recipe.key,
            steps: LANGUAGES.map(l => recipe.i18n[l].steps.length),
            ingredients: LANGUAGES.map(l => recipe.i18n[l].ingredients.length),
        }))
        .filter(r => new Set(r.steps).size !== 1 || new Set(r.ingredients).size !== 1);

    expect(mismatches).toMatchSnapshot();
});

test('recipe ids are unique and lookup map is complete', () => {
    const ids = recipes.map(r => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(recipesById.size).toBe(recipes.length);
    for (const recipe of recipes) {
        expect(recipesById.get(recipe.id)).toBe(recipe);
    }
});

test('recipe keys are unique', () => {
    const keys = recipes.map(r => r.key);
    expect(new Set(keys).size).toBe(keys.length);
});

test('slugs are unique within each language and never empty', () => {
    for (const language of LANGUAGES) {
        const slugs = recipes.map(r => getRecipeSlug(r, language));
        expect(slugs.every(s => s.length > 0)).toBe(true);
        expect(new Set(slugs).size).toBe(slugs.length);
    }
});

test('picture indexes are valid and never exceed the step count', () => {
    for (const recipe of recipes) {
        for (const language of LANGUAGES) {
            const stepCount = recipe.i18n[language].steps.length;
            for (const picture of getPictures(recipe, language)) {
                expect(Number.isInteger(picture.index)).toBe(true);
                expect(picture.index).toBeGreaterThanOrEqual(0);
                expect(picture.index).toBeLessThanOrEqual(stepCount);
                expect(picture.url).toMatch(/^https?:\/\//);
            }
        }
    }
});

test('video urls are absolute when present', () => {
    for (const recipe of recipes) {
        if (recipe.video !== undefined) {
            expect(recipe.video).toMatch(/^https?:\/\//);
        }
    }
});
