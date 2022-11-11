import React from "react";
import "./DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  const 
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}