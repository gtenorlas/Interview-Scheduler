import React from "react";
import classNames from "classnames";
import './InterviewerListItem.scss'

export default function InterviewerListItem(props) {
  const imgClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  const interviewer = {
    id: props.id,
    name: props.name,
    avatar: props.avatar
  };

  const formatImg = (isSelected) => {
    if (isSelected) {
      return (<>
      <img

        src={interviewer.avatar}
        alt={interviewer.name} />
        {interviewer.name}
        </>);
    } else {
      return (<img

        src={interviewer.avatar}
        alt={interviewer.name} />);
    }
  }

  return (
    <li className="interviewers__item" onClick={() => props.setInterviewer(interviewer.id)}>
      {formatImg(props.selected)}
    </li>
  );
}