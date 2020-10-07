import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


const UpdateMovie = (props) => {

    const initialMovie = {
        title: '',
        director: '',
        metascore: '',
        actors: ''
    };

    const [movie, setMovie] = useState(initialMovie);

    const {id} = useParams();


    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <form>
                <label htmlFor='title' >
                    <input type='text' name='title' id='title' />
                </label>
                <label htmlFor='director' >
                    <input type='text' name='director' id='director' />
                </label>
                <label htmlFor='metascore'> 
                    <input type='text' name='metascore' id='metascore' />
                </label>
                <label >
                    <input type='text' name='actors' id='actors' />
                </label>
            </form>
        </div>
    )
}

export default UpdateMovie;