import React, { useState } from 'react'
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
  const [message, setMessage] = useState('')

  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }


    transition(SAVING, true)

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(() => {
        setMessage('Could not save appointment')
        transition(ERROR_SAVE, true)
      })
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

  function showMessage(newMessage) {
    setMessaage(newMessage);
    return message;
  }

  return (
    <article className='appointment' data-testid='appointment'>
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
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message='Saving...' />}
      {mode === ERROR_SAVE && (
        <Error onClose={() => back()} message={message} />
      )}
      {mode === DELETING && <Status message='Deleting...' />}
      {mode === ERROR_DELETE && (
        <Error onClose={() => back()} message='Could not delete appointment' />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={()=>setMessage('Are you sure you would like to delete?')}
          onCancel={() => transition(SHOW)}
          onConfirm={cancel}
        />
      )}
    </article>
  )
}
