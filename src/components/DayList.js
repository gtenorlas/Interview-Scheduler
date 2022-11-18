import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days.map((each) => {
    return (
      <DayListItem
        name={each.name}
        spots={each.spots}
        key={each.id}
        selected={each.name === props.value}
        setDay={props.onChange} >
      </DayListItem>
    );

  });

  return (
    <ul>
      {days}
    </ul>
  );
}
