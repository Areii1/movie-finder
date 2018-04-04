import React from 'react';
import PropTypes from 'prop-types';
import SearchMovieListItem from './SearchMovieListItem';
import './SearchMovieList.css';

function SearchMovieList(props) {
  const filteredList = props.list.filter(movie => movie.poster_path);
  const finalList = filteredList.map(movie => (
    <li key={movie.id}>
      <SearchMovieListItem movie={movie} />
    </li>
  ));
  return (
    <div className="search-movie-list-wrapper">
      <ul className="search-movie-list">{finalList}</ul>
    </div>
  );
}

SearchMovieList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

export default SearchMovieList;
