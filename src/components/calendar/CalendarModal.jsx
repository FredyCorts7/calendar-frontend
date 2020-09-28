import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAdd, eventSetActive, eventUpdated } from '../../actions/event';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowEnd = moment().minutes(0).seconds(0).add(2, 'hours');

const initialEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowEnd.toDate(),
};

export const CalendarModal = () => {
  const { isOpenModal } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowEnd.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initialEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initialEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventSetActive(null));
  };

  const handleStartChange = (date) => {
    setStartDate(date);
    setFormValues({
      ...formValues,
      start: date,
    });
  };

  const handleEndChange = (date) => {
    setEndDate(date);
    setFormValues({
      ...formValues,
      end: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        'Error',
        'Fecha final debe ser mayor que la fecha inicial',
        'error'
      );
    }

    if (title.trim().length < 3) {
      return setTitleValid(false);
    }

    // TODO: save in database
    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(
        eventAdd({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: 654,
            name: 'Camila',
          },
        })
      );
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpenModal}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className='modal'
      overlayClassName='modal-fondo'
    >
      <h1> {activeEvent ? 'Actualizar evento' : 'Nuevo evento'} </h1>
      <hr />
      <form className='container' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartChange}
            value={startDate}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndChange}
            value={endDate}
            minDate={startDate}
            className='form-control'
          />
        </div>

        <hr />
        <div className='form-group'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={title}
            onChange={handleInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
