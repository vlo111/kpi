import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '../../__mocks__/Axios';
import '../../__mocks__/MatchMedia';
import SignIn from '../../pages/Auth/SignIn';
import { ExpectElementExist, Login } from '../../types/test';

/**
 * Login function
 * Submit form after filed (in)correct data in the fields
 */
const login: Login = async (email, password) => {
  await act(async () => {
    fireEvent.change(screen.getByTestId('email'), {
      target: { value: email }
    });

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: password }
    });
  });

  await act(async () => {
    fireEvent.submit(screen.getByRole('button'));
  });
};
/**
 * Text To be In The Document
 * @param item
 */
const expectInTheDocument: ExpectElementExist = async (item) =>
  await waitFor(() => expect(screen.queryByText(item)).toBeInTheDocument());
/**
 * Text To be Not In The Document
 * @param item
 */
const expectNotInTheDocument: ExpectElementExist = async (item) =>
  await waitFor(() => expect(screen.queryByText(item)).not.toBeInTheDocument());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Sign In Form', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <SignIn />
      </QueryClientProvider>
    );
  });

  /**
   * Check fields exist on the Login page
   */
  describe('Sign In: Check the actions and behavior of fields', () => {
    /**
     * Check elements in the document
     */
    test('should be sign in elements in the page', () => {
      expect(screen.getByRole('button')).toHaveClass('primary');

      expect(screen.getByTestId('email')).toBeInTheDocument();

      expect(screen.getByTestId('password')).toBeInTheDocument();

      expect(screen.getByText('Forgot password?')).toBeInTheDocument();
    });

    /**
     * Check elements placeholder in the document
     */
    test('should be sign in inputs with placeholder', () => {
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();

      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });
  });

  /**
   * Fields behaviour after submit form
   */
  describe('Sign In: Form behaviour', () => {
    /**
     * Empty input validation
     */
    test('validate user inputs, and provides empty input error messages', async () => {
      await login('', '');

      await expectInTheDocument('Please enter a valid Email Address');

      await expectInTheDocument('Please enter a valid Password');
    });

    /**
     * Filled input validation
     */
    test('validate user inputs, and provides filled input error messages', async () => {
      await login('vv@vv.v', '123456');

      await expectInTheDocument(
        'Please enter your Email Address in format: yourname@domain.com'
      );

      await expectInTheDocument(
        "'password' must be between 8 and 64 characters"
      );

      await expectNotInTheDocument('Please enter a valid Email Address');

      await expectNotInTheDocument('Please enter a valid Password');
    });

    /**
     * Filled input validation
     * Get error message from server
     */
    test('validate user inputs, and provides received error messages from server', async () => {
      await login('vv@vv.vv', '12345678');

      await waitFor(() =>
        expect(
          screen.queryByText('Invalid email or password')
        ).toBeInTheDocument()
      );
    });
  });
});
