import React from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import useForm from '../../../infra/hooks/forms/useForm';
import { loginService } from '../../services/login/loginService';

// Definido modelo/schema do formulario
const loginSchema = yup.object().shape({
  user: yup
    .string()
    .required('"Usuario" eh obrigatorio')
    .min(3, 'Preencha ao menos 3 caracteres'),
  password: yup
    .string()
    .required('"Senha" eh obrigatorio')
    .min(8, 'Preencha ao menos 8 caracteres'),
});

export default function LoginForm() {
  const router = useRouter();
  const initialValues = {
    user: '',
    password: '',
  };
  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      loginService
        .login({
          username: values.user,
          password: values.password,
        })
        .then(() => {
          router.push('/app/profile');
        });
    },
    async validateSchema(values) {
      return loginSchema.validate(values, {
        abortEarly: false,
      });
    },
  });
  return (
    <form id="registerForm" onSubmit={form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="user"
        value={form.values.user}
        error={form.errors.user}
        onChange={form.handleChange}
      />
      <TextField
        placeholder="Senha"
        name="password"
        type="password"
        value={form.values.password}
        error={form.errors.password}
        onChange={form.handleChange}
      />

      <Button
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
        disabled={form.isFormDisabled}
      >
        Entrar
      </Button>
    </form>
  );
}
