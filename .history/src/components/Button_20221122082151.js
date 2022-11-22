import React from "react";
import "components/Button.scss";
import classNames from "classnames";

/*
Button to be used for the side-bar
*/
export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}