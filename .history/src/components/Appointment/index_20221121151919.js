import React from 'react'
import './styles.scss'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import useVisualMode from 'hooks/useVisualMode'

const EMPTY = 'EMPTY'
const SHOW = 'SHOW'
const CREATE = 'CREATE'
const SAVING = 'SAVING'

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    //console.log(props.id, interview)

    setTimeout(() => {
      transition(SAVING)
    }, 2000)

    setTimeout(() => {
      props.bookInterview(props.id, interview).then(() => {
        transition(SHOW)
      })
    }, 3000)
  }

  //delete appointment
  function cancel () {
    const interview = {
      student: name,
      interviewer
    }
    
    props.cancelInterview(props.id).then(() => {
      transition(SHOW)
    })
  }

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancel}
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
      {mode === SAVING && <Status message='Saving' />}
    </article>
  )
}
