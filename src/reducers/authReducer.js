import { types } from '../types/types';

const initialState = {
  loading: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case types.authLoaded:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
