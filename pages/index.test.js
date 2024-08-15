import { render, screen } from '@testing-library/react';
import Home from '../index';

test('renders welcome message', () => {
    render(<Home />);
    const welcomeElement = screen.getByText(/Welcome to my Seneca Store/i);
    expect(welcomeElement).toBeInTheDocument();
});

test('shows login/register prompt if not logged in', () => {
    render(<Home />);
    const loginPrompt = screen.getByText(/Login or Register yourself/i);
    expect(loginPrompt).toBeInTheDocument();
});
