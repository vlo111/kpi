import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import '../../__mocks__/Combine';
import SignIn from '../../pages/Auth/SignIn';
import { ExpectElementExist, Login } from '../../types/test';
import { VALIDATE_EMPTY, VALIDATE_FILLED } from '../../helpers/constants';
import renderer from 'react-test-renderer';
import { ProjectProvider } from '../../hooks/useProject';

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
  await waitFor(() => expect(screen.getByText(item)).toBeInTheDocument());
/**
 * Text To be Not In The Document
 * @param item
 */
const expectNotInTheDocument: ExpectElementExist = async (item) =>
  await waitFor(() => expect(screen.queryByText(item)).not.toBeInTheDocument());

describe('Sign In Form', () => {
  beforeEach(() => {
    render(<ProjectProvider><SignIn /></ProjectProvider>);
  });

  /**
   * Check fields exist on the Login page
   */
  describe('Sign In: Check the fields in the document', () => {
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
  describe('Sign In: Form validation behaviour', () => {
    /**
     * Empty input validation
     */
    test('validate user inputs, and provides empty input error messages', async () => {
      await login('', '');

      await expectInTheDocument(VALIDATE_EMPTY.email);

      await expectInTheDocument(VALIDATE_EMPTY.password);
    });

    /**
     * Filled input validation
     */
    test('validate user inputs, and provides filled input error messages', async () => {
      await login('vv@vv.v', '123456');

      await expectInTheDocument(VALIDATE_FILLED.email);

      await expectInTheDocument(VALIDATE_FILLED.password);

      await expectNotInTheDocument(VALIDATE_EMPTY.email);

      await expectNotInTheDocument(VALIDATE_EMPTY.password);
    });
  });
});

describe('Snapshot sign in', () => {
  test('sign in page', () => {
    const tree = renderer.create(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
