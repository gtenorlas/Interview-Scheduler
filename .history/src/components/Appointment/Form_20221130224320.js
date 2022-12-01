import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



/*
Form card to show for creating and updating an appointment
*/
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel=({onCancel})=>{
    reset();
    onCancel();
  }

  function validate() {
    if (student === '') {
      setError('Student name cannot be blank');
      return;
    }
    if (!interviewer) {
      setError('Please select an interviewer');
      return;
    }
    setError('');
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=>cancel(props)}>Cancel</Button>
          <Button confirm onClick={()=>validate()} >Save</Button>
        </section>
      </section>
    </main>
  );
}