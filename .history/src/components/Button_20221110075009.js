import React from "react";
import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";
 
   if (props.confirm) {
     buttonClass += " button--confirm";
   }else if (props.danger) {
      buttonClass += " button--danger";
   }else if (props.clicked) {
      button
   }
 
   return <button className={buttonClass}>{props.children}</button>;
 }