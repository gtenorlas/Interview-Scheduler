import { useState, useEffect } from 'react'
import axios from 'axios'

/*
Handles states and API calls
*/

const HOST_URL = 'http://localhost:8001';

export default function useApplicationData () {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day })

  //retrieve initial days, appointments, interviewers from back-end once
  useEffect(() => {
    Promise.all([
      axios.get(`${HOST_URL}/api/days`),
      axios.get(`${HOST_URL}/api/appointments`),
      axios.get(`${HOST_URL}/api/interviewers`)
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, [])

  /*
  Handles saving and updating an appointment
  */
  function bookInterview (id, interview) {
    //check if it is an update or a new appointment
    const isNewAppointment = state.appointments[id].interview ? false : true 

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `${HOST_URL}/api/appointments/${id}`,
        data: { interview }
      })
        .then(response => {
          let days
          //update spots
          if (isNewAppointment) {
            days = state.days.map(each => {
              if (each.name === state.day) {
                return { ...each, spots: each.spots - 1 }
              }
              return each
            })
          } else {
            days = [...state.days]
          }

          setState({
            ...state,
            appointments,
            days
          })
          resolve(response)
        })
        .catch(error => reject(error))
    })
  }

  /*
  Handles deletion of an appointment
  */
  function cancelInterview (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return new Promise((resolve, reject) => {
      axios
        .delete(`${HOST_URL}/api/appointments/${id}`)
        .then(response => {

          //calculate spots
          const days = state.days.map(each => {
            if (each.name === state.day) {
              return { ...each, spots: each.spots + 1 }
            }
            return each
          })

          setState({
            ...state,
            appointments,
            days
          })

          resolve(response)
        })
        .catch(error => {
          console.log('error delete', error)
          reject(error)
        })
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
