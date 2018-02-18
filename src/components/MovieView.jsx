import React from 'react';
import { Link } from 'react-router-dom';

function MovieView(props) {
  return (
    <div>
      <p> MOvie : {props.match.params.id} </p>
      <Link to="/">back to the main page </Link>
    </div>
  );
}

export default MovieView;
