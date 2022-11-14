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

  const formatImg(isSelected) {
    if(selected) {
     return() <img
      className="interviewers__item-image"
      src="https://i.imgur.com/LpaY82x.png"
      alt="Sylvia Palmer" />
    Sylvia Palmer
    }
  }

  return (
    <li className={liClass} onClick={() => props.setInterviewer(interviewer.id)}>
       props.selected ?
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer" />
      Sylvia Palmer
      :
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      
    </li>
  );
}