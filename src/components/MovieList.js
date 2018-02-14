import React from 'react';

function MovieList(props) {

  const list = props.list.map(movie => 
      <li key={movie.id}>
      {movie.title}</li>
    );

  return (
    <ul>{list}</ul>
  );
}

export default MovieList