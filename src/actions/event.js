import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const eventStartAdd = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const res = await fetchWithToken('event', event, 'POST');
      const body = await res.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };
        console.log(event);
        dispatch(eventAdd(event));
      }
    } catch (error) {
      Swal.fire('Error');
    }
  };
};

const eventAdd = (event) => ({
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

export const eventDeleted = () => ({
  type: types.eventDeleted,
});
