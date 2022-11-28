import React from "react";
import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';


/*
Creates interviewer list menu
*/
export default function InterviewerList(props) {
  const interviewItems = props.interviewers.map((each) => {
    return (
      <InterviewerListItem
        key={each.id}
        name={each.name}
        avatar={each.avatar}
        setInterviewer={() => props.onChange(each.id)}
        selected={each.id === props.value}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewItems}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
