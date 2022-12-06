/*
Reformat data structure for Appointments for a selected day
*/
export function getAppointmentsForDay (state, day) {
  const selectedDay = {}
  const matchAppointments = []

/*   for (const each of state.days) {
    if (each.name === day) {
      selectedDay.name = each.name
      selectedDay.appointments = each.appointments
      break
    }
  } */

  selectedDay=state.days.filter((each)=>{
    if(each.name===day) {
      sele
    }
  })

  if (selectedDay.appointments) {
    for (const each of selectedDay.appointments) {
      matchAppointments.push(state.appointments[each])
    }
  }

  return matchAppointments
}

/*
Reformat data structure for Interviewers for a selected day
*/
export function getInterviewersForDay (state, day) {
  const selectedDay = {}
  const matchInterviewers = []

  for (const each of state.days) {
    if (each.name === day) {
      selectedDay.name = each.name
      selectedDay.interviewers = each.interviewers
      break
    }
  }

  if (selectedDay.interviewers) {
    const interviewerList = selectedDay.interviewers;
    interviewerList.forEach((interviewerId) => {
      for (const interviewer in state.interviewers) {
        if (interviewerId === Number(interviewer)) {
          matchInterviewers.push(state.interviewers[interviewer]);
        }
      }
    });
  }

  return matchInterviewers
}

/*
Reformat interview data structure to the one below:

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

  return newInterview
}
