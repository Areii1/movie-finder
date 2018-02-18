import React from 'react';
import PropTypes from 'prop-types';

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
    <div>
      <div>
        <img
          className="movie-poster"
          src={posterUrl + props.movie.poster_path}
          alt="movie_poster"
        />
        <p className="movie-title">{props.movie.title}</p>
      </div>
      <ul className="movie-genres-list">
        {genresList}
      </ul>
    </div>
  );

  return (
    <div>
      { listItem }
    </div>
  );
}

MovieListItem.propTypes = {
  movie: PropTypes.objectOf({}).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieListItem;
