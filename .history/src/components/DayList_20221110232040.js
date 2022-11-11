import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days.map((each) => {
    return (
      <DayListItem name={each.name} spots={each.spots} key={each.id} selected={each.name ===}></DayListItem>
    );

  });

  return (
    <ul>


    </ul>
  );
}