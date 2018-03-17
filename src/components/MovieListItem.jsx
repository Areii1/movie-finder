import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MovieListItem.css';

const posterUrl = 'http://image.tmdb.org/t/p/w185';

function MovieListItem(props) {
  const genresList = props.movie.genre_ids.map((id) => {
    if (props.genres[id]) {
      return (
        <li
          key={id}
          className="movie-genres-list-item"
        >
          {props.genres[id].name}
        </li>
      );
    }
    return null;
  });

  const listItem = (
    <Link
      to={`/movieview/${props.movie.id}`}
      className="movie-list-item"
    >
      <img
        className="movie-poster"
        src={posterUrl + props.movie.poster_path}
        alt="movie_poster"
      />
      <p className="movie-list-item-title">{props.movie.title}</p>
      <ul className="movie-genres-list">
        {genresList}
      </ul>
    </Link>
  );

  return (
    listItem
  );
}

MovieListItem.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

export default MovieListItem;
