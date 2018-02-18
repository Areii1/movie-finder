import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MovieView(props) {
  return (
    <div>
      <p> MOvie : {props.match.params.id} </p>
      <Link to="/">back to the main page </Link>
    </div>
  );
}

MovieView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieView;
