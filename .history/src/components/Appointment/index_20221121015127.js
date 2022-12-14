import React from 'react'
import './styles.scss'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import useVisualMode from 'hooks/useVisualMode'

const EMPTY = 'EMPTY'
const SHOW = 'SHOW'
const CREATE = 'CREATE'

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //console.log(props.id, interview)
    props.bookInterview(props.id, interview);
    transition()
  }

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
       <Form student="" interviewer={null} interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
    </article>
  )
}
