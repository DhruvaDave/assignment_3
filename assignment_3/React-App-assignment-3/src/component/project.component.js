import React, { Component } from "react";
import MovieDataService from "../utils/getData";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeTiming = this.onChangeTiming.bind(this);
    this.getMovie = this.getMovie.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);

    this.state = {
      currentMovie: {
        id: null,
        title: "",
        location: "",
        timing: new Date(),
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMovie(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMovie: {
          ...prevState.currentMovie,
          title: title
        }
      };
    });
  }

  onChangeLocation(e) {
    const location = e.target.value;
    
    this.setState(prevState => ({
      currentMovie: {
        ...prevState.currentMovie,
        location: location
      }
    }));
  }

  onChangeTiming(e) {
    const timing = e;
    
    this.setState(prevState => ({
      currentMovie: {
        ...prevState.currentMovie,
        timing: timing
      }
    }));
  }

  getMovie(id) {
    MovieDataService.get(id)
      .then(response => {
        this.setState({
          currentMovie: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentMovie.id,
      title: this.state.currentMovie.title,
      location: this.state.currentMovie.location,
      timing: this.state.currentMovie.timing,
      published: status
    };
    MovieDataService.update(this.state.currentMovie.id, data)
    .then(response => {
      this.setState(prevState => ({
        currentMovie: {
          ...prevState.currentMovie,
          published: status
        }
      }));
      console.log(response.data);
    })
    .catch(e => {
        console.log(e);
      });
  }

  updateMovie() {
    MovieDataService.update(
      this.state.currentMovie.id,
      this.state.currentMovie
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The mvoie data was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMovie() {    
    MovieDataService.delete(this.state.currentMovie.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/project')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMovie } = this.state;

    return (
      <div>
        {currentMovie ? (
          <div className="edit-form">
            <h4>Movie</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMovie.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={currentMovie.location}
                  onChange={this.onChangeLocation}
                />
              </div>
              <div className="form-group">
                <label htmlFor="timing">Timing</label>
                <DatePicker
                  id="timing"
                  selected={Date.parse(currentMovie.timing)}
                  onSelect={this.onChangeTiming}
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={this.onChangeTiming}
                />
                
              </div>
            </form>

            
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMovie}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMovie}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Movie...</p>
          </div>
        )}
      </div>
    );
  }
}