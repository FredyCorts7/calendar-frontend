import React, { useState } from 'react';
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
import { eventSetActive } from '../../actions/event';
import { AddNewFab } from '../ui/AddNewFab';

const localizer = momentLocalizer(moment);
moment.locale('es');

// const events = [
//   {
//     title: 'Entrevista con Megaterios',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Practicar Node y Python',
//     user: {
//       _id: '123',
//       name: 'Fredy',
//     },
//   },
// ];

export const CalendarScreen = () => {
  const { events } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

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
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: 0,
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };

    return {
      style,
    };
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
        components={{ event: CalendarEvent }}
      />

      <AddNewFab />

      <CalendarModal />
    </div>
  );
};
