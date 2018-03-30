import React from 'react';
import PropTypes from 'prop-types';
import MovieListItem from './MovieListItem';
import './MovieList.css';

function MovieList(props) {
  const filteredList = props.list.filter(movie => movie.poster_path);
  const finalList = filteredList.map(movie => (
    <li key={movie.id}>
      <MovieListItem
        movie={movie}
        genres={props.genres}
        searchTerm={props.searchTerm}
        updateScroll={props.updateScroll}
      />
    </li>
  ));
  return (
    <div className="movie-list-wrapper">
      <div className="mode-of-list-label">
        <h2 className="mode-of-list">
          {(props.displayMode === 'search')
          ? 'SEARCH' : 'DISCOVER'
          }
        </h2>
      </div>
      <ul className="movie-list">{finalList}</ul>
    </div>
  );
}

MovieList.propTypes = {
  updateScroll: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchTerm: PropTypes.string,
  displayMode: PropTypes.string.isRequired,
};

export default MovieList;
