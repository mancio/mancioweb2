import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import Recipes from '../pages/Recipes';
import RecipesGen from '../pages/RecipesGen';
import {RECIPES} from '../logic/Names';

function renderRecipeAt(slug: string) {
    return render(
        <MemoryRouter initialEntries={[`${RECIPES}/${slug}`]}>
            <Routes>
                <Route path={`${RECIPES}/:recipeName`} element={<RecipesGen/>}/>
            </Routes>
        </MemoryRouter>
    );
}

beforeEach(() => {
    localStorage.clear();
});

describe('Recipes list page', () => {
    test('lists recipes in the default language', () => {
        render(<MemoryRouter><Recipes/></MemoryRouter>);
        expect(screen.getByText('Spaghetti alla Carbonara')).toBeInTheDocument();
        expect(screen.getByText('Focaccia in padella')).toBeInTheDocument();
    });

    test('filters the list as the user types', () => {
        render(<MemoryRouter><Recipes/></MemoryRouter>);

        fireEvent.change(screen.getByPlaceholderText('Search...'), {target: {value: 'carbonara'}});

        expect(screen.getByText('Spaghetti alla Carbonara')).toBeInTheDocument();
        expect(screen.queryByText('Focaccia in padella')).not.toBeInTheDocument();
    });

    test('switches the listed titles when the language changes', () => {
        render(<MemoryRouter><Recipes/></MemoryRouter>);

        fireEvent.change(screen.getByRole('combobox'), {target: {value: 'EN'}});

        expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
        expect(screen.queryByText('Spaghetti alla Carbonara')).not.toBeInTheDocument();
    });
});

describe('Recipe detail page', () => {
    test('renders title, servings, ingredients and steps', () => {
        renderRecipeAt('spaghettiallacarbonara');

        expect(screen.getByRole('heading', {name: 'Spaghetti alla Carbonara'})).toBeInTheDocument();
        expect(screen.getByText('4 porzioni')).toBeInTheDocument();
        expect(screen.getByText('320 gr di spaghetti')).toBeInTheDocument();
        expect(screen.getByText(/Far bollire la pasta/)).toBeInTheDocument();
    });

    test('renders the new focaccia recipe', () => {
        renderRecipeAt('focacciainpadella');

        expect(screen.getByRole('heading', {name: 'Focaccia in padella'})).toBeInTheDocument();
        expect(screen.getByText('300g di farina 00')).toBeInTheDocument();
        expect(screen.getByText('1 focaccia da 24-26 cm')).toBeInTheDocument();
    });

    test('shows a fallback instead of crashing for an unknown recipe', () => {
        renderRecipeAt('this-recipe-does-not-exist');

        expect(screen.getByRole('heading', {name: 'Recipe not found'})).toBeInTheDocument();
    });

    test('scales ingredient quantities with the multiplier', () => {
        renderRecipeAt('spaghettiallacarbonara');

        expect(screen.getByText('320 gr di spaghetti')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', {name: '➡️'}));

        expect(screen.getByText('480 gr di spaghetti')).toBeInTheDocument();
    });

    test('remembers which ingredients are checked', () => {
        renderRecipeAt('spaghettiallacarbonara');

        fireEvent.click(screen.getAllByRole('checkbox')[0]);

        expect(JSON.parse(localStorage.getItem('checkedIngredients')!)[0]).toBe(true);
    });
});
