import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import UpdateMovieForm from "./Movies/UpdateMovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies")
      .then(res => {
        setMovies(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/"
        render={props => {
          return <MovieList {...props} movies={movies} setMovies={setMovies} />
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} setMovies={setMovies} movies={movies} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path='/update-movie/:id' render={props => {
        return <UpdateMovieForm {...props} movies={movies} setMovies={setMovies} />
      }} />
    </>
  );
};

export default App;
