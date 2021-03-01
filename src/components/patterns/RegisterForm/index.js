import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import Box from '../../foundation/layout/Box';
import Grid from '../../foundation/layout/Grid';
import Text from '../../foundation/Text';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

function FormContent() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(formStates.DEFAULT);

  const [userInfo, setUserInfo] = useState({
    username: 'guijun13',
    name: 'Guilherme Jun',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo, // mantem as outras infos do objeto
      [fieldName]: event.target.value,
    });
  }

  const isFormInvalid =
    userInfo.username.length === 0 || userInfo.name.length === 0;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault(); // previne o evento padrao do <form />, que é action="/api/..."

        setIsFormSubmitted(true);

        // Data Transfer Object
        const userDTO = {
          username: userInfo.username,
          name: userInfo.name,
        };

        fetch('https://instalura-api.vercel.app/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDTO),
        })
          .then((serverResponse) => {
            if (serverResponse.ok) {
              return serverResponse.json();
            }

            throw new Error('Não foi possível cadastrar um novo usuário :c');
          })
          .then((serverResponseObject) => {
            setSubmissionStatus(formStates.DONE);
            console.log(serverResponseObject);
          })
          .catch((error) => {
            setSubmissionStatus(formStates.ERROR);
            console.error(error);
          });
      }}
    >
      <Text variant="title" tag="h1" color="tertiary.main">
        Pronto para saber da vida dos outros?
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="tertiary.light"
        marginBottom="32px"
      >
        Você está a um passo de saber tudoo que está rolando no bairro, complete
        seu cadastro agora!
      </Text>
      <div>
        <TextField
          placeholder="Nome"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          placeholder="Usuário"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        disabled={isFormInvalid}
        variant="primary.main"
        fullWidth
      >
        Cadastrar
      </Button>

      {isFormSubmitted && submissionStatus === formStates.DONE && (
        <p>Deu tudo certo :D</p>
      )}
      {isFormSubmitted && submissionStatus === formStates.ERROR && (
        <p>Algo deu errado :c</p>
      )}
    </form>
  );
}

export default function RegisterForm({ modalProps }) {
  return (
    <Grid.Row marginLeft={0} marginRight={0} flex={1} justifyContent="flex-end">
      <Grid.Col
        display="flex"
        paddingRight={{ md: '0' }}
        flex={1}
        value={{ xs: 12, md: 6, lg: 5 }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '85px',
          }}
          backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...modalProps}
        >
          <FormContent />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}

RegisterForm.propTypes = {
  modalProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
