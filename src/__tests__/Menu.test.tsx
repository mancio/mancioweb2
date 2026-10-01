import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Menu from '../pages/Menu';

test('home page introduces Mancio and groups the sections', () => {
    render(<MemoryRouter><Menu/></MemoryRouter>);

    expect(screen.getByRole('heading', {name: 'Mancio'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: "Games I've published"})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Play right here'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Recipes/})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'GitHub'})).toHaveAttribute('href', 'https://github.com/mancio');
});
