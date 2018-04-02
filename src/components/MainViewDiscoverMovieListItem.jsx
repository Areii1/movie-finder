import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MainViewDiscoverMovieListItem.css';

const backdropUrl = 'http://image.tmdb.org/t/p/w300';

function MainViewDiscoverMovieListItem(props) {
  const listItem = (
    <Link
      to={`/movie/${props.movie.id}`}
      className="main-view-movie-list-item"
    >
      <div
        className="main-view-movie-list-item-inner"
        style={{
          background:
          `url(${backdropUrl + props.movie.backdrop_path}) center/cover no-repeat`,
        }}
      >
        <div className="main-view-blending-cover" />
        <p className="main-view-movie-list-item-title">{props.movie.title}</p>
      </div>
    </Link>
  );

  return (
    listItem
  );
}

MainViewDiscoverMovieListItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    backdrop_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainViewDiscoverMovieListItem;
