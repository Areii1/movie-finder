import React from 'react';
import PropTypes from 'prop-types';
import MainViewDiscoverMovieListItem from './MainViewDiscoverMovieListItem';
import './MainViewDiscoverMovieList.css';

function MainViewDiscoverMovieList(props) {
  const firstRoundFilterList = props.list.filter(movie => movie.backdrop_path);
  const secondRoundFilterList = firstRoundFilterList.filter((movie, index) => index < 9);
  const finalList = secondRoundFilterList.map(movie => (
    <li key={movie.id}>
      <MainViewDiscoverMovieListItem
        movie={movie}
      />
    </li>
  ));
  return (
    <div className="main-view-movie-list-wrapper">
      <ul className="main-view-movie-list">
        {finalList}
      </ul>
    </div>
  );
}

MainViewDiscoverMovieList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainViewDiscoverMovieList;
