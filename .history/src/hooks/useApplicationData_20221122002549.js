export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day })
  /* const setDays = days => setState(prev => ({ ...prev, days }))
    const setAppointments = appointments => setState(prev => ({ ...prev, appointments })) */


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
        setState({
          ...state,
          appointments
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
        setState({
          ...state,
          appointments
        })
    
        resolve(response)
      })
      .catch(error => {
        console.log('error delete', error)
        reject(error)
      })
  })
}