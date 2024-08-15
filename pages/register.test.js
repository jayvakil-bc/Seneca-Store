import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../register';

test('renders signup form', () => {
    render(<Signup />);
    const signupHeading = screen.getByText(/SignUp \/ Create your account/i);
    expect(signupHeading).toBeInTheDocument();
});

test('displays error message on failed signup', async () => {
    render(<Signup />);
    const signupButton = screen.getByText(/SignUp/i);
    fireEvent.click(signupButton);
    const errorMessage = await screen.findByText(/Passwords do not match/i);
    expect(errorMessage).toBeInTheDocument();
});
