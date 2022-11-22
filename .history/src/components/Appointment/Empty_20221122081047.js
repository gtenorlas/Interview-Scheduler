import React from "react";
import './styles.scss'

/*
Clickable '+' sign for empty appointment 
*/
export default function Empty(props) {
  return (<main className="appointment__add">
    <img
      className="appointment__add-button"
      src="images/add.png"
      alt="Add"
      onClick={props.onAdd}
    />
  </main>
  );
}