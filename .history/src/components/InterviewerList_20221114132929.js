import React from "react";
import './InterviewerList.scss'

export default function InterviewerList(props) {
const interviewItems = props.interviewers.map((each)=>{
  return();
});

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}