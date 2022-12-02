import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '../../__mocks__/Axios';
import '../../__mocks__/MatchMedia';
import SignUp from '../../pages/Auth/SignUp';
import { ExpectElementExist, ExpectToBeInDocument } from '../../types/test';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

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
describe('Sign Up: Check the actions and behavior of fields', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <SignUp />
      </QueryClientProvider>
    );
  });
  const expectPlaceholderToBeInDocument: ExpectToBeInDocument = (...items) =>
    items.map((item) =>
      expect(screen.getByPlaceholderText(item)).toBeInTheDocument()
    );

  /**
   * Check elements in the document
   * Check element placeholder in the document
   * Expect Primary Button
   */
  test('should be sign up fields in the document with placeholder', async () => {
    expectPlaceholderToBeInDocument(
      'First Name',
      'Last Name',
      'Email Address',
      'Organisation Name',
      'Password',
      'Confirm Password'
    );

    expect(screen.getByRole('button')).toHaveClass('primary');
  });

  /**
   * Empty input validation
   */
  test('validate user inputs, and provides empty input error messages', async () => {
    // await act(async () => {
    //   fireEvent.change(screen.getByTestId('email'), {
    //     target: { value: email }
    //   });
    //
    //   fireEvent.change(screen.getByTestId('password'), {
    //     target: { value: password }
    //   });
    // });

    await act(async () => {
      fireEvent.submit(screen.getByTestId('signUpForm'));
    });

    screen.debug(undefined, 300000);

    // await expectInTheDocument('Please enter a valid Email Address');
    //
    // await expectInTheDocument('Please enter a valid First Name');
    //
    // await expectInTheDocument('Please enter a valid Last Name');
    //
    // await expectInTheDocument('Please enter a valid Organisation Name');
    //
    // await expectInTheDocument('Please enter a valid Password');
    //
    // await expectInTheDocument('Please enter a valid Confirm Password');
    //
    // await expectNotInTheDocument('The two passwords that you entered do not match!');
  });
});
