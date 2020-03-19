// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';


//  const UpdateMovie = props => {
//     const [updatedMovie, setUpdatedMovie] = useState({
//         title: '',
//         director: '',
//         metascore: null,
//         stars: []
//     });

//     const { id } = useParams();
//     const { movies, match } = props;
//     console.log(props)

//     useEffect(() => {
//         const id = match.params.id;
//         const itemById = movies.find(item => `${item.id}` === id)

//         if (itemById) {
//             setUpdatedMovie(itemById)
//         }
//         // axios
//         // .get(`http://localhost:5000/api/movies/${id}`)
//         // .then(res => {
//         //     console.log('Secondary useEffect res: ', res.data);
//         //     setUpdatedMovie(res.data);
//         // })
//     }, [match.params.id, movies]);

//     const changeHandler = e => {
//         setUpdatedMovie({
//             ...updatedMovie,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = e => {
//         e.preventDefault();

//         axios
//             .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
//             .then(res => {
//                 console.log(res);
//                 props.history.push(`http://localhost:5000/api/movies/${id}`)
//             })
//             .catch(err => {
//                 console.error('Error in updated movie: ', err);
//             });
//     }
//     return (
//         <div>
//             <h2>Update?</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type='text'
//                     name='title'
//                     onChange={changeHandler}
//                     placeholder='title'
//                     value={updatedMovie.title}
//                 />
//                 <input
//                     type='text'
//                     name='director'
//                     onChange={changeHandler}
//                     placeholder='director'
//                     value={updatedMovie.director}
//                 />
//                 <input
//                     type='text'
//                     name='metascore'
//                     onChange={changeHandler}
//                     placeholder='metascore'
//                     value={updatedMovie.metascore}
//                 />
//                 <input
//                     type='text'
//                     name='stars'
//                     onChange={changeHandler}
//                     placeholder='stars'
//                     value={updatedMovie.stars}
//                 />
//                 <button onClick={handleSubmit}>Save?</button>
//             </form>
//         </div>
//     );
// };
// export default UpdateMovie;

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";

function UpdateMovie(props) {
    const { id } = useParams();
    const [updatedMovie, setUpdatedMovie] = useState({
                id: {id},
                title: '',
                director: '',
                metascore: '',
                stars: []
            });

    const { movies } = props;
    console.log("props", props)
    useEffect(() => {
        const itemById = movies.find(movie => {
            return `${movie.id}` === props.match.params.id;
        })

        // if(props.movies == null) {
        //     return
        // }

        if (itemById) {
            setUpdatedMovie(itemById)
        }
    }, [props.movies, props.match.params.id]);

    const handleChanges = e => {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${updatedMovie.id}`, updatedMovie)
            .then(res => {
                console.log('axios in update movie: ', res.data);
                props.getData(res.data);
                props.history.push('/')
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={updatedMovie.title}
                placeholder="title"
                onChange={handleChanges}
            />
            <label>Director</label>
            <input
                type="text"
                name="director"
                value={updatedMovie.director}
                placeholder="director"
                onChange={handleChanges}
            />
            <label>Metascore</label>
            <input
                type="text"
                name="metascore"
                value={updatedMovie.metascore}
                placeholder="metascore"
                onChange={handleChanges}
            />
            <button onClick={handleSubmit}>Update</button>
        </form>
        </div>
    )
}

export default UpdateMovie;