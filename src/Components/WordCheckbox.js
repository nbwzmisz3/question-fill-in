import React from "react";

const WordCheckbox = (props) => {
  return (
    <li>
      <input type="checkbox"  value={props.value} id={props.value + '-' + props.index}></input>
      <label htmlFor={props.value + '-' + props.index}>{props.value}</label>
    </li>
  )
}
export default WordCheckbox;