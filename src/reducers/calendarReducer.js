import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      title: 'Entrevista con Megaterios',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgcolor: '#fafafa',
      notes: 'Practicar Node y Python',
      user: {
        _id: '123',
        name: 'Fredy',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventAdd:
      return {
        ...state,
      };
    default:
      return state;
  }
};
