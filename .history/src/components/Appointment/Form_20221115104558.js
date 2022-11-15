import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


const cancel = (reset,props) => {
  reset(setStudent,setInterviewer);
  props.onCancel;
}

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = (setStudent,setInterviewer) => {
    setStudent("");
    setInterviewer(null);
  }



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={student}
            type="text"
            placeholder={student || "Enter Student Name"}
            onChange={() => setStudent}
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
          <Button danger>Cancel</Button>
          <Button confirm >Save</Button>
        </section>
      </section>
    </main>
  );
}