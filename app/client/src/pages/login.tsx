import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { LoginForm, Loading } from '../components';
import * as LoginTypes from './__generated__/login';
import { isLoggedInVar } from '../cache';

export const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`;

export default function Login() {
  const [login, { loading, error }] = useMutation<
    LoginTypes.Login,
    LoginTypes.LoginVariables
    >(LOGIN_USER,
      {
        // onCompleted callback. This enables us to interact with the mutation's result data as soon as it's available.
        // It stores the user's unique ID and session token in localStorage.
        onCompleted({ login }) {
          if (login) {
            localStorage.setItem('token', login.token as string);
            localStorage.setItem('userId', login.id as string);
            // it replaces the variable's current value with the provided value, here true.
            isLoggedInVar(true);
          }
        }
      }
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}