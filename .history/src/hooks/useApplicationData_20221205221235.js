import { useReducer, useEffect } from 'react'
import axios from 'axios'

const SET_DAY = 'SET_DAY'
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA' //set days, appointments, interviewers
const SET_INTERVIEW = 'SET_INTERVIEW'
const ADD_SPOTS = 'ADD_SPOTS'
const SUBTRACT_SPOTS = 'SUBTRACT_SPOTS'

/*
Handles states and API calls
*/
export default function useApplicationData () {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({ type: SET_DAY, day })

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days?q=proxy`),
      axios.get(`/api/appointments?q=proxy`),
      axios.get(`/api/interviewers?q=proxy`)
    ]).then(all => {
      const applicationData = {
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }
      dispatch({ type: SET_APPLICATION_DATA, ...applicationData })
    })
  }, [])

  function reducer (state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days || state.days,
          appointments: action.appointments || state.appointments,
          interviewers: action.interviewers || state.interviewers
        }
      case SET_INTERVIEW:
        return {
          ...state,
          interview: action.interview
        }
      case SUBTRACT_SPOTS: {
        const days = getDays(
          [...state.days],
          SUBTRACT_SPOTS,
          state.day,
          action.isNewAppointment
        )
        return {
          ...state,
          days
        }
      }
      case ADD_SPOTS: {
        const days = getDays([...state.days], ADD_SPOTS, state.day)
        return {
          ...state,
          days
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        )
    }
  }

  /*
  Handles updating the spots in the Days array
  return : days 
  */
  function getDays (
    stateDays,
    operation,
    selectedDay,
    isNewAppointment = false
  ) {
    let days = null
    if (operation === SUBTRACT_SPOTS) {
      if (isNewAppointment) {
        days = stateDays.map(each => {
          if (each.name === selectedDay) {
            return { ...each, spots: each.spots - 1 }
          }
          return each
        })
      } else {
        days = [...stateDays]
      }
    }
    if (operation === ADD_SPOTS) {
      days = stateDays.map(each => {
        if (each.name === selectedDay) {
          return { ...each, spots: each.spots + 1 }
        }
        return each
      })
    }
    return days
  }

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
        axios.put(`/api/appointments/${id}?q=proxy`,{ interview })
          .then(response => {
            dispatch({ type: SET_APPLICATION_DATA, appointments })
            dispatch({ type: SUBTRACT_SPOTS, isNewAppointment })
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
        .delete(`/api/appointments/${id}?q=proxy`)
        .then(response => {
          dispatch({ type: SET_APPLICATION_DATA, appointments })
          dispatch({ type: ADD_SPOTS })
          resolve(response)
        })
        .catch(error => {
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
