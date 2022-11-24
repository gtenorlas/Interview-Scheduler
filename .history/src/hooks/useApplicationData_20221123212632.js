/* import { useState, useEffect } from 'react' */
import { useReducer, useEffect } from 'react'
import axios from 'axios'

/*
Handles states and API calls
*/

const HOST_URL = 'http://localhost:8001'
const SET_DAY = 'SET_DAY'
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA' //set days, appointments, interviewers
const SET_INTERVIEW = 'SET_INTERVIEW'
const ADD_SPOTS = 'ADD_SPOTS'
const SUBTRACT_SPOTS = 'SUBTRACT_SPOTS'

export default function useApplicationData () {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  /*   const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })
 */

  /*   const setDay = day => setState({ ...state, day }) */

  const setDay = day => dispatch({ type: SET_DAY, day })

  //retrieve initial days, appointments, interviewers from back-end once
  /*   useEffect(() => {
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
  }, []) */

  useEffect(() => {
    Promise.all([
      axios.get(`${HOST_URL}/api/days`),
      axios.get(`${HOST_URL}/api/appointments`),
      axios.get(`${HOST_URL}/api/interviewers`)
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
        const getDays = () => {
          let days
          if (action.isNewAppointment) {
            days = state.days.map(each => {
              if (each.name === state.day) {
                return { ...each, spots: each.spots - 1 }
              }
              return each
            })
          } else {
            days = [...state.days]
          }
        }
        return {
          ...state,
          days: getDays()
        }
      }
      case ADD_SPOTS: {
        const getDays = () => {
          const days = state.days.map(each => {
            if (each.name === state.day) {
              return { ...each, spots: each.spots + 1 }
            }
            return each
          })
          return days
        }
        return {
          ...state,
          days: getDays()
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
  */
  function getDays (operation, isNewAppointment) {
    let days
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
        }

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
      axios({
        method: 'put',
        url: `${HOST_URL}/api/appointments/${id}`,
        data: { interview }
      })
        .then(response => {
          /*           let days
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
 */
          /*     setState({
            ...state,
            appointments,
            days
          }) */
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
        .delete(`${HOST_URL}/api/appointments/${id}`)
        .then(response => {
          //calculate spots
/*           const days = state.days.map(each => {
            if (each.name === state.day) {
              return { ...each, spots: each.spots + 1 }
            }
            return each
          })
 */
          /*          setState({
            ...state,
            appointments,
            days
          }) */
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
