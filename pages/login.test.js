import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../login';

test('renders login heading', () => {
    render(<Login />);
    const headingElement = screen.getByText(/Login/i);
    expect(headingElement).toBeInTheDocument();
});

test('displays error message on failed login', async () => {
    render(<Login />);
    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);
    const errorMessage = await screen.findByText(/Invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
});
