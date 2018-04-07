import React from 'react';
import './Button.css';

function Button(props) {
  console.log(props.link, 'link');
  return (
    <a href={props.link} target="_blank">
      <button className={`button ${props.type}`}>{props.label}</button>
    </a>
  );
}

export default Button;
