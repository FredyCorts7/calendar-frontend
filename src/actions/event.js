import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
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

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken(`event/${event.id}`, event, 'PUT');
      const body = await res.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
        Swal.fire('Success', 'Evento actualizado', 'success');
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      Swal.fire('Error', error, 'error');
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken('event');
      const body = await res.json();

      if (body.ok) {
        const events = prepareEvents(body.events);

        dispatch(eventLoaded(events));
      }
    } catch (error) {
      Swal.fire('Error', error, 'error');
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});
