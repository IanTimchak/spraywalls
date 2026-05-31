import { render, screen } from '@testing-library/react-native';

import { AppRoot } from '../src/app/AppRoot';

describe('AppRoot', () => {
  it('renders the auth form', () => {
    render(<AppRoot />);

    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Password')).toBeTruthy();
    expect(screen.getByText('Sign in')).toBeTruthy();
    expect(screen.getByText('Sign up')).toBeTruthy();
  });
});
