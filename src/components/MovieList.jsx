import React from 'react';
import PropTypes from 'prop-types';
import MovieListItem from './MovieListItem';

function MovieList(props) {
  const list = props.list.map(movie => (
    <li key={movie.id}>
      <div className="moviesListItem-wrapper">
        {movie.poster_path && (
          <MovieListItem movie={movie} genres={props.genres} />
        )}
      </div>
    </li>
  ));

  return (
    <ol>{list}</ol>
  );
}

MovieList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
