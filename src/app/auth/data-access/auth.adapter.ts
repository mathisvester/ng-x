import { createAdapter } from '@state-adapt/core';
import { Models } from 'appwrite';
import { AuthState } from './auth.store';

export const authAdapter = createAdapter<AuthState>()({
  loginSuccess: (state, user: Models.User<any>) => ({
    ...state,
    user,
  }),
  registrationSuccess: (state, user: Models.User<any>) => ({
    ...state,
    user,
  }),
  logoutSuccess: state => ({
    ...state,
    user: null,
  }),
  selectors: {
    user: state => state.user,
  },
});
