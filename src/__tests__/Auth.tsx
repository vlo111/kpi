/**
 * Test Auth Sign In Page
 */

import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';

import { App } from '../App';
import '../__mocks__/MatchMedia';

/**
 * Check fields exist on the Login page
 */
describe('Check the actions and behavior of fields', () => {
  /**
   * Check elements in the document
   */
  test('should be sign in elements in the page', () => {
    const { getByRole, getByText, getByTestId } = render(App);

    expect(getByRole('button')).toHaveClass('primary');

    expect(getByTestId('email')).toBeInTheDocument();

    expect(getByTestId('password')).toBeInTheDocument();

    expect(getByText('Forgot password?')).toBeInTheDocument();
  });

  /**
   * Check elements placeholder in the document
   */
  test('should be sign in inputs with placeholder', () => {
    const { getByPlaceholderText } = render(App);

    expect(getByPlaceholderText('Email Address')).toBeInTheDocument();

    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });
});

/**
 * Fields behaviour after submit form
 */
describe('Sign In Form behaviour', () => {
  /**
   * Empty input validation
   */
  test('validate user inputs, and provides empty input error messages', async () => {
    const { getByTestId, queryByText } = render(App);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: '' }
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: '' }
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('signInForm'));
    });

    await waitFor(() => expect(queryByText('Please enter a valid Email Address')).toBeInTheDocument());

    await waitFor(() => expect(queryByText('Please enter a valid Password')).toBeInTheDocument());
  });

  /**
   * Filled input validation
   */
  test('validate user inputs, and provides filled input error messages', async () => {
    const { getByTestId, queryByText } = render(App);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'vv@vv.v' }
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: '123456' }
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('signInForm'));
    });

    await waitFor(() => expect(queryByText('Please enter your Email Address in format: yourname@domain.com')).toBeInTheDocument());

    await waitFor(() => expect(queryByText('Password must be between 8-64 characters')).toBeInTheDocument());

    await waitFor(() => expect(queryByText('Please enter a valid Email Address')).not.toBeInTheDocument());

    await waitFor(() => expect(queryByText('Please enter a valid Password')).not.toBeInTheDocument());
  });

  /**
   * Filled input validation
   * Get error message from server
   */
  test('validate user inputs, and provides received error messages from server', async () => {
    const { getByTestId, queryByText } = render(App);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'vv@vv.vv' }
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: '12345678' }
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('signInForm'));
    });

    await waitFor(() => expect(queryByText('Invalid email or password')).toBeInTheDocument());
  });

  // -> should submit when form inputs contain text
});
