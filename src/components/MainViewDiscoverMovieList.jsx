import React from 'react';
import PropTypes from 'prop-types';
import MainViewDiscoverMovieListItem from './MainViewDiscoverMovieListItem';
import './MainViewDiscoverMovieList.css';

function MainViewDiscoverMovieList(props) {
  const filteredList = props.list
    .filter(movie => movie.backdrop_path)
    .filter((movie, index) => (index < 10 && index > 0))
    .map(movie => (
      <li key={movie.id}>
        <MainViewDiscoverMovieListItem
          movie={movie}
        />
      </li>
    ));
  return (
    <div className="main-view-movie-list-wrapper">
      <ul className="main-view-movie-list">
        {filteredList}
      </ul>
    </div>
  );
}

MainViewDiscoverMovieList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainViewDiscoverMovieList;
