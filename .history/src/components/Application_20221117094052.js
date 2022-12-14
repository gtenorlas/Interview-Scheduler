import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import 'components/Application.scss'
import DayList from './DayList'
import Appointment from 'components/Appointment'

const days = [
  {
    id: 1,
    name: 'Monday',
    spots: 2
  },
  {
    id: 2,
    name: 'Tuesday',
    spots: 5
  },
  {
    id: 3,
    name: 'Wednesday',
    spots: 0
  }
]

const appointments = {
  '1': {
    id: 1,
    time: '12pm'
  },
  '2': {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 3,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png'
      }
    }
  },
  '3': {
    id: 3,
    time: '2pm'
  },
  '4': {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Archie Andrews',
      interviewer: {
        id: 4,
        name: 'Cohana Roy',
        avatar: 'https://i.imgur.com/FK8V841.jpg'
      }
    }
  },
  '5': {
    id: 5,
    time: '4pm'
  }
}

export default function Application (props) {
  const [day, setDay] = useState('Monday')
  const [days2, setDays2] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
    .then((response)=>{
      console.log(response.data.results)
      /* setDays([...response.data.results]); */
    });
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
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {Object.values(appointments).map(each => (
          <Appointment key={each.id} {...each} />
        ))}
      </section>
    </main>
  )
}
