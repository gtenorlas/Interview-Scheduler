import React from "react";
import "./DayListItem.scss"
import classNames from "classnames";


/*
Show days list items menu on side bar
*/
export default function DayListItem(props) {
  const liClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpots=(count)=>{
    if (count===0) {
      return "no spots remaining"
    }else if(count===1) {
      return "1 spot remaining";
    }else {
      return `${count} spots remaining`;
    }
  }

  return (
    <li onClick={() => props.setDay(props.name)} className={liClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}