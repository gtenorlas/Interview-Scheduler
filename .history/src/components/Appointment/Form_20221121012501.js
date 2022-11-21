import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";




export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel=({onCancel})=>{
    reset();
    onCancel();
  }



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={student}
            type="text"
            placeholder={student || "Enter Student Name"}
            onChange={() => {setStudent console.log(student)}}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=>cancel(props)}>Cancel</Button>
          <Button confirm onClick={()=>props.onSave(student,interviewer)} >Save</Button>
        </section>
      </section>
    </main>
  );
}