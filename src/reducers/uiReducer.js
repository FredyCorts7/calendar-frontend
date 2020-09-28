import { types } from '../types/types';

const initialState = {
  isOpenModal: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        isOpenModal: true,
      };
    default:
      return state;
  }
};
