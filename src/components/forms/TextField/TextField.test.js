import React from 'react';
import { render, screen } from '../../../infra/test/testUtils';
import TextField from './index';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Jun"
        value="Jun"
        onChange={() => {}}
        name="nome"
      />
    );
    // screen.debug();

    const textField = screen.getByPlaceholderText(/jun/i);
    expect(textField).toMatchSnapshot();
  });

  describe('when field is valid', () => {});
  describe('when field is invalid', () => {
    // o que esperamos que aconteca
    test('displays the repective error message', () => {
      render(
        <TextField
          placeholder="Email"
          value="jun@gmail.com"
          onChange={() => {}}
          name="email"
          isTouchedField
          error="O campo é obrigatorio"
        />
      );

      const inputEmail = screen.getByPlaceholderText(/email/i);
      expect(inputEmail).toHaveValue('jun@gmail.com');
      expect(screen.getByRole('alert')).toHaveTextContent(
        'O campo é obrigatorio'
      );
      expect(inputEmail).toMatchSnapshot();
    });
  });
});
