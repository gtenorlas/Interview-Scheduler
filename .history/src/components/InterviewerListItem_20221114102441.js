import React from "react";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const liClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

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