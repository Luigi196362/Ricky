import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
  ) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(
      email: $email
      username: $username
      password: $password
    ) {
       user {
         id
         username
         password
       }


    }

  }
`;


const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    username: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
  variables: {
    username: formState.username,
    password: formState.password
  },
  onCompleted: ({ tokenAuth }) => {
    localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
    navigate('/');
  }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
  variables: {
    email: formState.email,
    username: formState.username,
    password: formState.password
  },
  onCompleted: ({ createUser }) => {
    // localStorage.setItem(AUTH_TOKEN, signup.token);
    console.log(createUser);
    navigate('/');
  }
  });
  
  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Inicias sesion' : 'Crear Cuenta'}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
              })
            }
            type="text"
            placeholder="Correo electronico"
          />
        )}
        <input
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value
            })
          }
          type="text"
          placeholder="Nombre de usuario"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Elige una contraseña segura"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? 'Iniciar sesion' : 'Crear Cuenta'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'Necesitas crear una cuenta?'
            : 'Ya tienes una cuenta?'}
        </button>
      </div>
    </div>
  );
};

export default Login;
