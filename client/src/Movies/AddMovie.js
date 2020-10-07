import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const AddMovie = (props) => {

    const initialMovie = {
        title: '',
        director: '',
        metascore: '',
        stars: []
    };

    const [movie, setMovie] = useState(initialMovie);

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


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies/`, movie)
            .then(res => {
                console.log(res);
                updateMovies();
            })
            .catch(err => {
                console.error(err);
            });
            push('/');
    }

    const handleChange = (e) => {
        if(e.target.name === 'stars')  {
            
            const array = e.target.value.split(',');
            console.log(array);
            setMovie({
                ...movie,
                stars: array
            })
        } else {
            setMovie({
                ...movie,
                [e.target.name]: e.target.value
            })
        }
        
    };

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <label htmlFor='title' >
                    <input type='text' name='title' id='title' value={movie.title} onChange={handleChange}  />
                </label>
                <label htmlFor='director' >
                    <input type='text' name='director' id='director' value={movie.director} onChange={handleChange} />
                </label>
                <label htmlFor='metascore'> 
                    <input type='text' name='metascore' id='metascore' value={movie.metascore} onChange={handleChange} />
                </label>
                <label >
                    <input type='text' name='stars' id='stars' onChange={handleChange} />
                </label>
                <button>Update Movie</button> 
            </form>
        </div>
    )
}

export default AddMovie;