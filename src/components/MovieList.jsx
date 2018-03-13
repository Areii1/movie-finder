import React from 'react';
import PropTypes from 'prop-types';
import MovieListItem from './MovieListItem';
import './MovieList.css';

function MovieList(props) {
  const filteredList = props.list.filter(movie => movie.poster_path);
  const finalList = filteredList.map(movie => (
    <li key={movie.id}>
      <div>
        <MovieListItem movie={movie} genres={props.genres} />
      </div>
    </li>
  ));

  return (
    <ol className="movie-list">{finalList}</ol>
  );
}

MovieList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
