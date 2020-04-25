import React, { Component } from "react";
import MovieDataService from "../utils/getData";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

export default class MovieTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeTiming = this.onChangeTiming.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.newMovie = this.newMovie.bind(this);

    this.state = {
      id: null,
      title: "",
      location: "", 
      timing: new Date(), 
      // published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  onChangeTiming(e) {
    this.setState({
      timing: e
    });
    console.log("------e-------",e);
  }

  saveMovie() {
    var data = {
      title: this.state.title,
      location: this.state.location,
      timing: this.state.timing
    };

    MovieDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          location: response.data.location,
          timing: response.data.timing,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMovie() {
    this.setState({
      id: null,
      title: "",
      location: "",
      timing: new Date(),
      published: false,

      submitted: false
    });
  }

  render() {
    // ...
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newMovie}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Movie Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  required
                  value={this.state.location}
                  onChange={this.onChangeLocation}
                  name="location"
                />
              </div>

              

              <div className="form-group">
                <label htmlFor="timing">timing</label>
                <DatePicker
                  id="timing"
                  selected={this.state.timing}
                  onSelect={this.onChangeTiming}
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={this.onChangeTiming}
                />
              </div>
  
              <button onClick={this.saveMovie} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
}