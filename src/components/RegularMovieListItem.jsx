import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RegularMovieListItem.css';

const posterUrl = 'http://image.tmdb.org/t/p/w342';

function RegularMovieListItem(props) {
  const firstGenreObject = props.genres.find(genre => genre.id === props.movie.genre_ids[0]);

  const listItem = (
    <Link
      to={`/movie/${props.movie.id}`}
      onClick={() => props.updateScroll(window.scrollY)}
      className="regular-movie-list-item"
    >
      <img
        className="regular-movie-poster"
        src={posterUrl + props.movie.poster_path}
        alt="movie_poster"
      />
      <p className="regular-movie-list-item-title">{props.movie.title}</p>

      {!!firstGenreObject && (
        <p className="regular-movie-genre">{firstGenreObject.name}</p>
      )}
    </Link>
  );

  return (
    listItem
  );
}

RegularMovieListItem.propTypes = {
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

export default RegularMovieListItem;
