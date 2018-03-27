import React from 'react';
import PropTypes from 'prop-types';
import './PerformerView.css';

function PerformerView(props) {
  return (
    <p>{props.match.params.performer}</p>
  );
}

PerformerView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      performer: PropTypes.string.isRequired,
    }),
  }),
};

export default PerformerView;
