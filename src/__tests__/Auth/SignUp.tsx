import { render, screen } from '@testing-library/react';
import { App } from '../../App';
import '../../__mocks__/MatchMedia';
import '../../__mocks__/Axios';
import { ExpectToBeInDocument } from '../../types/test';
import SignUp from '../../pages/Auth/SignUp';

/**
 * Check fields exist on the Login page
 */
describe('Sign Up: Check the actions and behavior of fields', () => {
  const expectToBeInDocument: ExpectToBeInDocument = (...items) => items.map((item) => expect(screen.getByPlaceholderText(item)).toBeInTheDocument());

  /**
   * Check elements in the document
   * Check elements placeholder in the document
   */
  test('should be sign up fields in the document with placeholder', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<SignUp />);

    screen.debug();

    //   expectToBeInDocument(
    //     'First Name', 'Last Name',
    //     'Email Address', 'Organisation Name',
    //     'Password', 'Confirm Password');
    // });
  });
});
