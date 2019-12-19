import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = id => {
    const movie = this.props.movies.find(m => {
      return `${m.id}` === this.props.match.params.id
    })
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log(res)
        this.props.history.push('/')
      })

      .catch(err => console.log(err))
  }



  editMovie = () => {
    const movie = this.props.movies.find(m => {
      return `${m.id}` === this.props.match.params.id
    })
    console.log(movie.id)
    this.props.history.push(`/update-movie/${movie.id}`)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        {console.log(this)}
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div onClick={this.editMovie}>
          Edit
        </div>
        <div onClick={this.deleteMovie}>
          Delete
        </div>
      </div>
    );
  }
}
