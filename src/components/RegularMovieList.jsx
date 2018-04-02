import React from 'react';
import PropTypes from 'prop-types';
import RegularMovieListItem from './RegularMovieListItem';
import './RegularMovieList.css';

function RegularMovieList(props) {
  const filteredList = props.list.filter(movie => movie.poster_path);
  const finalList = filteredList.map(movie => (
    <li key={movie.id}>
      <RegularMovieListItem
        movie={movie}
        genres={props.genres}
        searchTerm={props.searchTerm}
        updateScroll={props.updateScroll}
      />
    </li>
  ));
  return (
    <div className="regular-movie-list-wrapper">
      <div className="regular-mode-of-list-label">
        <h2 className="regular-mode-of-list">
          {(props.displayMode === 'search')
          ? 'SEARCH' : 'DISCOVER'
          }
        </h2>
      </div>
      <ul className="regular-movie-list">{finalList}</ul>
    </div>
  );
}

RegularMovieList.propTypes = {
  updateScroll: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchTerm: PropTypes.string,
  displayMode: PropTypes.string.isRequired,
};

export default RegularMovieList;
