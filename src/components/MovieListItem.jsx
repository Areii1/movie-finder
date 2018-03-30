import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MovieListItem.css';

const posterUrl = 'http://image.tmdb.org/t/p/w342';

function MovieListItem(props) {
  const firstGenreObject = props.genres.find(genre => genre.id === props.movie.genre_ids[0]);

  const listItem = (
    <Link
      to={`/movie/${props.movie.id}`}
      onClick={() => props.updateScroll(window.scrollX, window.scrollY)}
      className="movie-list-item"
    >
      <img
        className="movie-poster"
        src={posterUrl + props.movie.poster_path}
        alt="movie_poster"
      />
      <p className="movie-list-item-title">{props.movie.title}</p>

      {!!firstGenreObject && (
        <p className="movie-genre">{firstGenreObject.name}</p>
      )}
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
