import React from "react";
import "./DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  const liClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpots=(count)=>{
    
  }

  return (
    <li onClick={() => props.setDay(props.name)} className={liClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}