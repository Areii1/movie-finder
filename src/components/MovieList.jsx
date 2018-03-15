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
    <div>
      <div className="mode-of-list-label">
        <h2 className={
          (props.displayMode === 'search')
          ? 'flipped-on' : 'flipped-off'
          }
        >
          SEARCH
        </h2>
        <h2 className={
          (props.displayMode === 'discover')
          ? 'flipped-on' : 'flipped-off'
          }
        >
          DISCOVER
        </h2>
      </div>
      <ol className="movie-list">{finalList}</ol>
    </div>
  );
}

MovieList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayMode: PropTypes.string.isRequired,
};

export default MovieList;
