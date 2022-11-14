import React from "react";
import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewItems = props.interviewers.map((each) => {
    return (
      <InterviewerListItem key={each.id} name={each.name} avatar={each.avatar} setInterviewer={props.setInterviewer} selected={each.id === props.interv} />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewItems}</ul>
    </section>
  );
}