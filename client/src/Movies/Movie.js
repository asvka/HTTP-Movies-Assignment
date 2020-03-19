import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Redirect } from 'react-router-dom';
import MovieCard from './MovieCard';
import UpdateMovie from './UpdateMovie';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    axios
        .delete(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log('Delete: ', res.data);
            props.getData(res.data);
            <Redirect to='/'></Redirect>
        })
        .catch(err => console.error(err))
}

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => {
        props.history.push(`/update-movie/${movie.id}`)}}>
        Update
      </button>
      <button onClick={deleteMovie} >
          Delete?
      </button>
    </div>
  );
}

export default Movie;
