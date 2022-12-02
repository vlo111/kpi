import { act, fireEvent, render, screen } from '@testing-library/react';
import { App } from '../../App';
import '../../__mocks__/MatchMedia';
import '../../__mocks__/Axios';
import { ExpectToBeInDocument } from '../../types/test';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => (jest.fn())
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useSignUpApi: () => (jest.fn())
}));

/**
 * Check fields exist on the Login page
 */
describe('Sign Up: Check the actions and behavior of fields', () => {
  const expectToBeInDocument: ExpectToBeInDocument = (...items) => items.map((item) => expect(screen.getByPlaceholderText(item)).toBeInTheDocument());

  /**
   * Check elements in the document
   * Check elements placeholder in the document
   */
  test('should be sign up fields in the document with placeholder', async () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    const { container } = render(App);

    screen.debug();

    //   expectToBeInDocument(
    //     'First Name', 'Last Name',
    //     'Email Address', 'Organisation Name',
    //     'Password', 'Confirm Password');
    // });
  });
});
