import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SearchMovieListItem.css';

const posterUrl = 'http://image.tmdb.org/t/p/w342';

function SearchMovieListItem(props) {
  const listItem = (
    <Link
      to={`/entity/movie/${props.movie.id}`}
      className="search-movie-list-item"
    >
      <img
        className="search-movie-poster"
        src={posterUrl + props.movie.poster_path}
        alt="movie_poster"
      />
      <p className="search-movie-list-item-title">{props.movie.title}</p>
    </Link>
  );

  return (
    listItem
  );
}

export default SearchMovieListItem;
