import {render, screen} from '@testing-library/react';
import App from '../App';

test('renders the app shell with the cookie notice', () => {
    render(<App/>);
    expect(screen.getByText(/This website uses cookies/i)).toBeInTheDocument();
});
