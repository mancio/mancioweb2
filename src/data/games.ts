export interface Game {
    title: string;
    /** one short, funny line about the game */
    pitch: string;
    /** where it is published, e.g. "itch.io", "Google Play", "Web" */
    platform: string;
    url: string;
    emoji: string;
}

// Add a published game here and it shows up on the home page.
export const PUBLISHED_GAMES: Game[] = [];

export const GITHUB_URL = 'https://github.com/mancio';
