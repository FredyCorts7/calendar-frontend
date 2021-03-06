import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventStartLoading } from '../../actions/event';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment);
moment.locale('es');

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const handleDoubleClick = (event) => {
    dispatch(uiOpenModal());
  };

  const handleSelect = (event) => {
    dispatch(eventSetActive(event));
  };

  const handleView = (view) => {
    localStorage.setItem('lastView', view);
    setLastView(view);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const {
      user: { _id },
    } = event;

    const style = {
      backgroundColor: _id === uid ? '#367cf7' : '#465660',
      borderRadius: 0,
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };

    return {
      style,
    };
  };

  const handleSelectSlot = (e) => {
    dispatch(eventSetActive(null));
  };

  return (
    <div className='calendar-screen'>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={handleDoubleClick}
        onSelectEvent={handleSelect}
        onView={handleView}
        view={lastView}
        onSelectSlot={handleSelectSlot}
        selectable={true}
        components={{ event: CalendarEvent }}
      />

      <AddNewFab />
      {activeEvent && <DeleteEventFab />}

      <CalendarModal />
    </div>
  );
};
