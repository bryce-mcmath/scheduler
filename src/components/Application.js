import React from 'react';
import useApplicationData from '../hooks/useApplicationData';
import DayList from './DayList';
import Appointment from 'components/Appointment';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from '../helpers/selectors';

import 'components/Application.scss';

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day).map(appt => {
    return (
      <Appointment
        {...appt}
        key={appt.id}
        interview={getInterview(state, appt.interview)}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
        {appointments}
        <Appointment key={'last'} time="5pm" />
      </section>
    </main>
  );
}
