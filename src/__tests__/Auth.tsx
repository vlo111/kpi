import { RenderRouter } from './Render';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { App } from '../App';

/**
 * Test Auth Sign In Page
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

  it('should be sign in inputs with placeholder', () => {
    const { getByPlaceholderText } = render(RenderRouter());

    expect(getByPlaceholderText('Email Address')).toBeInTheDocument();

    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });
});

describe('Sign In Form behaviour', () => {
  it('validate user inputs, and provides error messages', async () => {
    const { getByTestId, getByText } = render(RenderRouter());

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

    expect(getByText('Please enter a valid Email Address')).toBeInTheDocument();
    expect(getByText('Please enter a valid Password')).toBeInTheDocument();
  });

  it('should submit when form inputs contain text', async () => {
    const { getByTestId, queryByText } = render(RenderRouter());

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'vv@vv.vv' }
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: '123456' }
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('signInForm'));
    });

    expect(queryByText('Please enter a valid Email Address')).not.toBeInTheDocument();
    expect(queryByText('Please enter a valid Password')).not.toBeInTheDocument();
  });

  // it('should be action validation when clicked button', async () => {
  //   const { getByRole, getByTestId } = render(RenderRouter());
  //
  //   const button = getByRole('button');
  //
  //   await act(() => fireEvent.submit(button));
  //   // await act(async () => {
  //   //   fireEvent.submit(getByTestId('signInForm'));
  //   // });
  //   // act(() => {
  //   //   /* fire events that update state */
  //   //   screen.debug();
  //   // }).then(() => {
  //   //   screen.debug();
  //   // }).catch((w) => {
  //   //   console.log(w);
  //   // });
  //
  //   screen.debug();
  // });
});
