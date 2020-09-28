import { types } from '../types/types';

export const eventAdd = (event) => ({
  type: types.eventAdd,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});
