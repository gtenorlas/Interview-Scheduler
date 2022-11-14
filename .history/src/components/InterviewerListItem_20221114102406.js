import React from "react";

export default function InterviewerListItem(props) {

  const interviewer = {
    id: props.id,
    name: props.name,
    avatar: props.avatar
  };

  return (
    <li className="interviewers__item" onClick={props.setInterviewer(interviewer.id)}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}