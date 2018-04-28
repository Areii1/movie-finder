import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Button.css';

function Button(props) {
  return (
    <div>
      {props.link && (
        <a
          href={props.link}
          target="_blank"
          className={`button ${props.type} ${props.className}`}
        >
          {props.label}
        </a>
      )}
      {props.id && (
        <Link
          to={`/movie/${props.id}`}
          className={`button ${props.type}`}
        >
          {props.label}
        </Link>
      )}
    </div>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.number,
};

export default Button;
