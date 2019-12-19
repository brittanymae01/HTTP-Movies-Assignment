import React, { useState, useEffect } from 'react';
import axios from 'axios'

const initialItem = {
    title: '',
    director: '',
    metascore: '',
    starts: []
};

const UpdateMovieForm = props => {
    const [updated, setUpdated] = useState(initialItem)

    useEffect(() => {
        const movie = props.movies.find(m => {
            return `${m.id}` === props.match.params.id
        })
        if (movie) {
            setUpdated(movie)
        }
    }, [props.movies, props.match.params.id])

    const handleChanges = e => {
        setUpdated({
            ...updated, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${updated.id}`, updated)
            .then(res => {
                props.history.push(`/movies/${updated.id}`)
            })
            .catch(err => console.log(err))
    }



    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    value={updated.title}
                    onChange={handleChanges}
                />
                <input
                    type='text'
                    name='director'
                    value={updated.director}
                    onChange={handleChanges}
                />
                <input
                    type='text'
                    name='metascore'
                    value={updated.metascore}
                    onChange={handleChanges}
                />
                {/* <input
                    type='text'
                    name='stars'
                value={updated.stars}
                onChange={handleChanges}
                /> */}
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovieForm;