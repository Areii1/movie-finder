import React from 'react';
import PropTypes from 'prop-types';

const posterUrl = 'http://image.tmdb.org/t/p/w185';

function MovieList(props) {
  const list = props.list.map(movie => (
    <li key={movie.id}>
      {movie.poster_path && (
        <div>
          <img
            className="movie-poster"
            src={posterUrl + movie.poster_path}
            alt="movie_poster"
          />
          <p className="movie-title">{movie.title}</p>
        </div>
      )}
      <ul className="movie-genres-list">
        {movie.genre_ids.map((id) => {
          if (props.genres.genres[id]) {
            return (
              <li
                key={id}
                className="movie-genres-list-item"
              >
                {props.genres.genres[id].name}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </li>
  ));

  return (
    <ol>{list}</ol>
  );
}

MovieList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
