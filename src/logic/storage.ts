import {ITALIAN, LANGUAGE_RECIPE_KEY} from "./Names";
import type {Language} from "../data/recipes/types";

export function setSharedLanguage(language: Language): void {
    localStorage.setItem(LANGUAGE_RECIPE_KEY, language);
}

export function getSharedLanguage(): Language {
    const stored = localStorage.getItem(LANGUAGE_RECIPE_KEY);
    return stored === 'EN' || stored === 'IT' || stored === 'PL' ? stored : ITALIAN;
}

export function setSharedObject(name: string, object: unknown): void {
    localStorage.setItem(name, JSON.stringify(object));
}

export function getSharedObject<T>(name: string): T | null {
    const raw = localStorage.getItem(name);
    if (raw === null) return null;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

export function removeSharedObject(name: string): void {
    localStorage.removeItem(name);
}
