import React, { useState, useEffect } from 'react';
import axios from 'axios';


 function UpdateMovie(props) {
    const [updatedMovie, setUpdatedMovie] = useState({
        title: '',
        director: '',
        metascore: null,
        stars: []
    });

    const { movies, match } = props;
    console.log(props)

    useEffect(() => {
        const id = match.params.id;
        const itemById = movies.find(item => `${item.id}` === id)

        if (itemById) {
            setUpdatedMovie(itemById)
        }
    }, [match.params.id, movies]);

    const changeHandler = e => {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, updatedMovie)
            .then(res => {
                console.log(res);
                props.getMovieList()
                props.history.push(`/movies/${props.match.params.id}`)
            })
            .catch(err => {
                console.error(err);
            });
    }
    return (
        <div>
            <h2>Update?</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='title'
                    value={updatedMovie.title}
                />
                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='director'
                    value={updatedMovie.director}
                />
                <input
                    type='text'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='metascore'
                    value={updatedMovie.metascore}
                />
                <input
                    type='text'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='stars'
                    value={updatedMovie.stars}
                />
                <button onClick={handleSubmit}>Save?</button>
            </form>
        </div>
    );
};
export default UpdateMovie;