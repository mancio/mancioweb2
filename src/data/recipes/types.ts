export type Language = 'IT' | 'EN' | 'PL';

export const LANGUAGES: readonly Language[] = ['IT', 'EN', 'PL'];

/** `index` 0 is the hero image; index N >= 1 illustrates step N - 1. */
export interface RecipePicture {
    index: number;
    url: string;
}

export interface RecipeTranslation {
    title: string;
    servings: string;
    ingredients: string[];
    steps: string[];
    notes?: string;
    /** Overrides the recipe-level pictures when a translation uses different images. */
    pictures?: RecipePicture[];
}

export interface Recipe {
    id: number;
    key: string;
    pictures: RecipePicture[];
    video?: string;
    i18n: Record<Language, RecipeTranslation>;
}
