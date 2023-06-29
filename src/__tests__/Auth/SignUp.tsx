import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import renderer from 'react-test-renderer';

import '../../__mocks__/Combine';
import SignUp from '../../pages/Auth/SignUp';
import {
  ExpectElementExist,
  ExpectEmptyValidation,
  ExpectToBeInDocument,
  GetByRole,
  GetTextBoxes
} from '../../types/test';
import { VALIDATE_EMPTY, VALIDATE_FILLED } from '../../helpers/constants';

/**
 * Text To be In The Document
 * @param item
 */
const expectInTheDocument: ExpectElementExist = async (item) =>
  await waitFor(() => expect(screen.getByText(item)).toBeInTheDocument());

/**
 * Get input by name
 */
const getByRole: GetByRole = async (name) =>
  screen.getByRole('textbox', { name });

/**
 * Expect empty filed validation to be in the document
 */
const expectEmptyValidation: ExpectEmptyValidation = async () => {
  await expectInTheDocument(VALIDATE_EMPTY.email);

  await expectInTheDocument(VALIDATE_EMPTY.firstName);

  await expectInTheDocument(VALIDATE_EMPTY.lastName);

  await expectInTheDocument(VALIDATE_EMPTY.email);

  await expectInTheDocument(VALIDATE_EMPTY.password);

  await expectInTheDocument(VALIDATE_EMPTY.confirm);
};

/**
 * Expect filled validation to be in the document
 */
const expectFilledValidation: ExpectEmptyValidation = async () => {
  await expectInTheDocument(VALIDATE_FILLED.firstName);

  await expectInTheDocument(VALIDATE_FILLED.lastName);

  await expectInTheDocument(VALIDATE_FILLED.email);

  await expectInTheDocument(VALIDATE_FILLED.organisation);

  await expectInTheDocument(VALIDATE_FILLED.password);

  await expectInTheDocument(VALIDATE_FILLED.organisation);
};

/**
 * Get all inputs by name
 */
const getTextBoxes: GetTextBoxes = async () => [
  await getByRole('First Name'),
  await getByRole('Last Name'),
  await getByRole('Email Address'),
  await getByRole('Organisation Name'),
  await screen.getByPlaceholderText('Password'),
  await screen.getByPlaceholderText('Confirm Password')
];

/**
 * Check fields exist on the Login page
 */
describe('Sign Up: Check the actions and behavior of fields', () => {
  beforeEach(() => {
    render(<SignUp />);
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
    await act(async () => {
      fireEvent.submit(screen.getByTestId('signUpForm'));
    });

    await expectEmptyValidation();
  });

  test('validate user inputs, and provides filled input error messages', async () => {
    const fields = await getTextBoxes();

    await act(async () => {
      fields.forEach((input) => {
        fireEvent.change(input, {
          target: { value: '1' }
        });
      });
    });

    await expectFilledValidation();
  });
});

describe('Snapshot sign up', () => {
  test('sign up page', () => {
    const tree = renderer
      .create(<SignUp />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
