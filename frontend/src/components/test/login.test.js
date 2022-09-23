import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserLogin from '../user-login'

test('Renders sign in', () => {
  render(<Router>
    <UserLogin/>
  </Router>);
  const signIn = screen.getByText(/Sign in/);
  expect(signIn).toBeInTheDocument();
});

test('Renders html', () => {
    render(<Router>
      <UserLogin/>
    </Router>);
    const signInHeader = screen.getByTestId("UserLogin");
    expect(signInHeader).toBeInTheDocument();
});


test('Login request', () => {
    render(<Router>
      <UserLogin/>
    </Router>);
    const testUser = {
        "user": "test_user",
        "password": "test_password"
    };

    UserLogin(testUser);
    
});