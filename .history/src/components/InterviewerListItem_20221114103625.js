import React from "react";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const liClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  const interviewer = {
    id: props.id,
    name: props.name,
    avatar: props.avatar
  };

  return (
    <li className={liClass} onClick={()=>props.setInterviewer(interviewer.id)}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}