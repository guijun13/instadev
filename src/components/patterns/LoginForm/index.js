import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';

function useForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues);

  return {
    values,
    // handleSubmit() -> manejar o submit
    handleSubmit(event) {
      event.preventDefault();
      onSubmit(values);
    },
    // handleChange() -> mudança do input
    handleChange(event) {
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;
      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: value,
      }));
    },
  };
}

export default function LoginForm() {
  const router = useRouter();
  const initialValues = {
    user: '',
    password: '',
  };
  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      router.push('/app/profile');

      fetch(
        'https://instalura-api-git-master-omariosouto.vercel.app/api/login',
        {
          // mode: 'no-cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.user,
            password: values.password,
          }),
        }
      )
        .then((serverResponse) => {
          if (serverResponse.ok) {
            return serverResponse.json();
          }

          throw new Error('Falha em pegar dados do servidor :c');
        })
        .then((convertedResponse) => {
          console.log(convertedResponse);
        });
    },
  });
  return (
    <form id="registerForm" onSubmit={form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="user"
        value={form.values.user}
        onChange={form.handleChange}
      />
      <TextField
        placeholder="Senha"
        name="password"
        type="password"
        value={form.values.password}
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
      >
        Entrar
      </Button>
    </form>
  );
}
