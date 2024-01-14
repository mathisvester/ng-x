import { createAdapter } from '@state-adapt/core';
import { Models } from 'appwrite';
import { AuthState } from './auth.store';

export const authAdapter = createAdapter<AuthState>()({
  loginSuccess: (state, user: Models.User<any>) => ({
    ...state,
    user,
    error: null,
  }),
  loginFailed: (state, error: any) => ({
    ...state,
    error,
  }),
  registrationSuccess: (state, user: Models.User<any>) => ({
    ...state,
    user,
    error: null,
  }),
  registrationFailed: (state, error: any) => ({
    ...state,
    error,
  }),
  logout: state => ({
    ...state,
    user: null,
  }),
  loginLeave: state => ({
    ...state,
    error: null,
  }),
  registrationLeave: state => ({
    ...state,
    error: null,
  }),
  selectors: {
    user: state => state.user,
    error: state => state.error,
  },
});
