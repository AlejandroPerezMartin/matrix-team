import { AuthProviders, AuthMethods } from 'angularfire2';

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBWBmRneAqmb1dIHeXWTrJkrfKw8MST9hg',
  authDomain: 'matrix-team.firebaseapp.com',
  databaseURL: 'https://matrix-team.firebaseio.com',
  storageBucket: 'matrix-team.appspot.com',
  messagingSenderId: '1060135408988'
};

export const FIREBASE_AUTH_ANONYMOUS = {
  provider: AuthProviders.Anonymous,
  method: AuthMethods.Anonymous,
};

export const FIREBASE_AUTH_EMAIL = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};

export const FIREBASE_AUTH_GOOGLE = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};
