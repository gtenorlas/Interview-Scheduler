import React from 'react'
import './styles.scss'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'
import useVisualMode from 'hooks/useVisualMode'

const EMPTY = 'EMPTY'
const SHOW = 'SHOW'
const CREATE = 'CREATE'
const SAVING = 'SAVING'
const CONFIRM = 'CONFIRM'
const DELETING = 'DELETING'
const EDIT = 'EDIT'
const ERROR_SAVE = 'ERROR_SAVE'
const ERROR_DELETE = 'ERROR_DELETE'

/*
Main component for appointment, handles all transitions for each cards
*/
export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  let message

  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }

    if (!name || !interviewer) {
      message = 'You must enter your name and select an interviewer to book an appointment.'
      transition=(ERROR_SAVE, true)
    }

    transition(SAVING, true)

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(() =>{
        message='Could not save appointment.'
         transition(ERROR_SAVE, true)})
  }

  //delete appointment
  function cancel () {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(() => transition(ERROR_DELETE, true))
  }

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          student=''
          interviewer={null}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message='Saving' />}
      {mode === ERROR_SAVE && (
        <Error onClose={() => back()} message='Could not save appointment' />
      )}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === ERROR_DELETE && (
        <Error onClose={() => back()} message='Could not delete appointment' />
      )}
      {mode === CONFIRM && (
        <Confirm
          message='Are you sure you would like to delete?'
          onCancel={() => transition(SHOW)}
          onConfirm={cancel}
        />
      )}
    </article>
  )
}
