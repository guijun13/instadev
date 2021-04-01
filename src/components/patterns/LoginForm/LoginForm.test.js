import React from 'react';
import user from '@testing-library/user-event';
import LoginForm from './index';
import { render, act, screen, waitFor } from '../../../infra/test/testUtils';

const onSubmit = jest.fn();
onSubmit.mockImplementation((event) => {
  event.preventDefault();
});

describe('<LoginForm />', () => {
  describe('when form fields are valid', () => {
    test('complete the submission', async () => {
      await act(async () => {
        render(<LoginForm onSubmit={onSubmit} />);
      });

      // espera que o botao esteja desabilitado
      expect(screen.getByRole('button')).toBeDisabled();

      // espera que tenha valor no input do usuario
      const inputUser = screen.getByPlaceholderText('Usuário');
      user.type(inputUser, 'someusername');
      await waitFor(() => expect(inputUser).toHaveValue('someusername'));

      // espera que tenha valor no input da senha
      const inputPassword = screen.getByPlaceholderText('Senha');
      user.type(inputPassword, 'somepassword');
      await waitFor(() => expect(inputPassword).toHaveValue('somepassword'));

      // espera que o botao esteja habilitado
      expect(screen.getByRole('button')).not.toBeDisabled();

      // clicar no botao
      user.click(screen.getByRole('button'));

      // screen.debug();

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
  describe('when form fields are invalid', () => {
    test('displays the respective errors', async () => {
      render(<LoginForm onSubmit={onSubmit} />);

      const inputUser = screen.getByPlaceholderText('Usuário');
      inputUser.focus();
      inputUser.blur();

      await waitFor(() => screen.getByRole('alert'));

      expect(screen.getByRole('alert')).toHaveTextContent(
        'Preencha ao menos 3 caracteres'
      );
    });
  });
});
