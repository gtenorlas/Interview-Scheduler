
export function getAppointmentsForDay (state, day) {
  const selectedDay = {}
  const matchAppointments = []

  for (const each of state.days) {
    if (each.name === day) {
      selectedDay.name = each.name
      selectedDay.appointments = each.appointments
      break
    }
  }

  if (selectedDay.appointments) {
    for (const each of selectedDay.appointments) {
      matchAppointments.push(state.appointments[each])
    }
  }

  return matchAppointments
}

export function getInterviewersForDay (state, day) {
  const selectedDay = {}
  const matchInterviewers = []

  for (const each of state.days) {
    if (each.name === day) {
      selectedDay.name = each.name
      selectedDay.appointments = each.appointments
      break
    }
  }

  if (selectedDay.appointments) {
    for (const each of selectedDay.appointments) {
      const appointmentObj=state.appointments[each];
      //check if interview is not null
      if(appointments)
      matchInterviewers.push(state.appointments[each])
    }
  }

  return matchInterviewers
}
/*
{  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}

*/
export function getInterview (state, interview) {
  const newInterview = {}

  //check if null
  if (!interview) {
    return null
  }

  newInterview.student = interview.student
  newInterview.interviewer = state.interviewers[interview.interviewer]

  return newInterview;
}
