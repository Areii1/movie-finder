import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button(props) {
  return (
    <a href={props.link} target="_blank">
      <button className={`button ${props.type}`}>{props.label}</button>
    </a>
  );
}

Button.propTypes = {
  link: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
