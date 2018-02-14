import React from 'react';

const posterUrl = 'http://image.tmdb.org/t/p/w185';

function MovieList(props) {
  const list = props.list.map(movie => 
      <li key={movie.id}>
        {movie.poster_path && (
          <div>
            <img 
              className="movie-poster" 
              src={posterUrl + movie.poster_path}
              alt="movie_poster">
            </img>
            <p className="movie-title">{movie.title}</p>
          </div>
        )}
        <ul className="movie-genres-list">
          {movie.genre_ids.map(id => {
            if (props.genres.genres[id]) {
              return <li 
                key={id}
                className="movie-genres-list-item">
                {props.genres.genres[id].name}
              </li>
            }
          })}
        </ul>

      </li>
    );

  return (
    <ol>{list}</ol>
  );
}

export default MovieList