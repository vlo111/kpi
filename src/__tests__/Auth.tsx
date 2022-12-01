import '@testing-library/jest-dom/extend-expect';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor
} from '@testing-library/react';

import { App } from '../App';
import '../__mocks__/MatchMedia';
import { ExpectElementExist, Login } from '../types/test';
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
    fireEvent.submit(screen.getByTestId('signInForm'));
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
    render(App);
    await login('', '');

    await expectInTheDocument('Please enter a valid Email Address');

    await expectInTheDocument('Please enter a valid Password');
  });

  /**
   * Filled input validation
   */
  test('validate user inputs, and provides filled input error messages', async () => {
    render(App);
    await login('vv@vv.v', '123456');

    await expectInTheDocument(
      'Please enter your Email Address in format: yourname@domain.com'
    );

    await expectInTheDocument('Password must be between 8-64 characters');

    await expectNotInTheDocument('Please enter a valid Email Address');

    await expectNotInTheDocument('Please enter a valid Password');
  });

  /**
   * Filled input validation
   * Get error message from server
   */
  test('validate user inputs, and provides received error messages from server', async () => {
    const { queryByText } = render(App);

    await login('vv@vv.vv', '12345678');

    await waitFor(() =>
      expect(queryByText('Invalid email or password')).toBeInTheDocument()
    );
  });

  /**
   * Filled input
   * Success login after form submit
   */
  test('should submit when form inputs contain correct login', async () => {
    const { queryByText } = render(App);

    await login('vv@vv.vv', '12345678');

    await waitFor(() =>
      expect(queryByText('Invalid email or password')).toBeInTheDocument()
    );
  });
});
