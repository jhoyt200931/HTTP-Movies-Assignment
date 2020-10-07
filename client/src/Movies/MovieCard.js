import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;

  const {push} = useHistory();

  const updateMovies = () => {
    axios.get('http://localhost:5000/api/movies')
        .then(res => {
            console.log(res);
            props.setMovieList(res.data);
        })
        .catch(err => {
            console.error(err);
        });
}

  const handleClick = (e) => {
    axios.delete(`http://localhost:5000/api/movies/${props.movie.id}`)
      .then(res => {
        console.log(res);
        updateMovies();
      })
      .catch(err => {
        console.error(err);
      });
      push('/');
  }

  return (
    <div className="movie-card">
      <Link to={`/update-movie/${props.movie.id}`} >Edit Movie</Link>
      <button onClick={handleClick}  >Delete Movie</button>
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
