import React from 'react'
import useApplicationData from 'hooks/useApplicationData'

import 'components/Application.scss'
import DayList from './DayList'
import Appointment from 'components/Appointment'
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from 'helpers/selectors'

export default function Application (props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData()

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewersForDay(state, state.day)

  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  return (
    <main className='layout'>
      <section className='sidebar'>
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {schedule}
        </section>
    </main>
  )
}
