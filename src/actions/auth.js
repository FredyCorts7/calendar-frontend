import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

import Swal from 'sweetalert2';
import { eventClean } from './event';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const res = await fetchWithoutToken(
      'auth/signin',
      { email, password },
      'POST'
    );
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const res = await fetchWithoutToken(
      'auth/signup',
      { name, email, password },
      'POST'
    );
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

export const startLoading = () => {
  return async (dispatch) => {
    const res = await fetchWithToken('auth/refresh');
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(loaded());
    }
  };
};

const loaded = () => ({
  type: types.authLoaded,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
    dispatch(eventClean());
  };
};

const logout = () => ({
  type: types.authLogout,
});
