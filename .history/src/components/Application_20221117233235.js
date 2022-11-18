import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import 'components/Application.scss'
import DayList from './DayList'
import Appointment from 'components/Appointment'
import { getAppointmentsForDay } from 'helpers/selectors'

export default function Application (props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  })

  const setDay = day => setState({ ...state, day })
  //const setDays = days => setState(prev => ({ ...prev, days }))
  const dailyAppointments = get

  useEffect(() => {
    /*     axios.get('http://localhost:8001/api/days').then(response => {
      setDays([...response.data])
    }) */

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments')
    ]).then(all => {
      // console.log(all[0]); // first
      //console.log(all[1]); // second
      setState(prev => ({ ...prev, days: all[0], appointments: all[1] }))
    })
  }, [])

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
        {Object.values(dailyAppointments).map(each => (
          <Appointment key={each.id} {...each} />
        ))}
      </section>
    </main>
  )
}
