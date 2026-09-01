/**
 * Phase 0 regression oracle, now reading the typed data model.
 *
 * The committed snapshots were generated from the ORIGINAL delimited-string recipe files.
 * They must keep matching: `structure` guards public URLs and shapes, `content` guards
 * ingredient quantities and step text. Recipes added after the migration are excluded so
 * the baseline stays comparable.
 */
import {recipes} from "../data/recipes";
import {getPictures, getRecipeSlug} from "../logic/recipes";
import type {Language} from "../data/recipes/types";

const MIGRATED_IDS = 26; // ids 0..25 existed before the migration
const LANGS: Language[] = ['EN', 'IT', 'PL'];

const rows = recipes
    .filter(r => r.id < MIGRATED_IDS)
    .flatMap(recipe => LANGS.map(language => {
        const t = recipe.i18n[language];
        return {
            id: recipe.id,
            language,
            title: t.title,
            slug: getRecipeSlug(recipe, language),
            servings: t.servings,
            ingredients: t.ingredients,
            steps: t.steps,
            pictureIndexes: getPictures(recipe, language).map(p => p.index),
            hasNotes: t.notes !== undefined,
            hasVideo: recipe.video !== undefined,
        };
    }))
    .sort((a, b) => a.id - b.id || a.language.localeCompare(b.language));

test('recipe structure is stable', () => {
    const structure = rows.map(({id, language, title, slug, servings, pictureIndexes, hasNotes, hasVideo, ingredients, steps}) => ({
        id,
        language,
        title,
        slug,
        servings,
        ingredientCount: ingredients.length,
        stepCount: steps.length,
        pictureIndexes,
        hasNotes,
        hasVideo,
    }));
    expect(structure).toMatchSnapshot();
});

test('recipe content is stable', () => {
    const content = rows.map(({id, language, ingredients, steps}) => ({id, language, ingredients, steps}));
    expect(content).toMatchSnapshot();
});
