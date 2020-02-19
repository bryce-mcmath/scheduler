import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayList from './DayList';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay } from '../helpers/selectors';

import 'components/Application.scss';

export default function Application() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = day =>
    setState({
      ...state,
      day
    });

  const setDays = days =>
    setState(prev => ({
      ...prev,
      days
    }));

  useEffect(() => {
    axios
      .get(`/api/days`)
      .then(res => {
        setDays(res.data);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(appt => {
          return <Appointment {...appt} key={appt.id} />;
        })}
        <Appointment key={'last'} time="5PM" />
      </section>
    </main>
  );
}
