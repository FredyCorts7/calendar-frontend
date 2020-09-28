import { types } from '../types/types';

const initialState = {
  loading: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    default:
      return state;
  }
};
