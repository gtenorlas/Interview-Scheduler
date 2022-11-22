import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useApplicationData () {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day })

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(all => {
      console.log('days', all[0].data)
      console.log('appointments', all[1].data)
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, [])

  function bookInterview (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    setState({
      ...state,
      appointments
    })

    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `http://localhost:8001/api/appointments/${id}`,
        data: { interview }
      })
        .then(response => {
          console.log('response status', response.status)
          const days = state.days.map((each)=>{
            if(each===state.day) {
              
              return {...each,spots: each.spots-1}
            }
            return each;
          });

        
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

  function cancelInterview (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    console.log('appointment', appointment)

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return new Promise((resolve, reject) => {
      axios
        .delete(`http://localhost:8001/api/appointments/${id}`)
        .then(response => {
          console.log('delete response', response)

          const spots=getSpotsLeft(state.days,state.day)+1;
          console.log("new spots", spots);

          const days = state.days.map((each)=>{
            if(each===state.day) {
              return {...each,spots: each.spots+1}
            }
            return each;
          });

        
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

  function getSpotsLeft (days, day) {
    let currentSpotsLeft = 0

    //make sure days is array
    if (Array.isArray(days)) {
      for (const each of days) {
        if (each.name === day) {
          currentSpotsLeft = each.spots
          break
        }
      }
    }

    console.log("currentSpotsLeft",currentSpotsLeft)
    return currentSpotsLeft;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
