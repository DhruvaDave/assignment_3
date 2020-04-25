import React, { Component } from "react";
import { getList, getWarData } from "./utils/getData";
// import Autocomplete from 'react-autocomplete';
// import ResultData from './component/ResultData';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import AddProject from "./component/add-project.component";
import Project from "./component/project.component";
import ProjectsList from "./component/projects-list.component";

import "./App.css";

class App extends Component {
  state = {
    searchTerm: "",
    allDataList: [],
    value: '',
    searchResult: []
  };

 

  render() {
    return (
    
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/project/findAll" className="navbar-brand">
              Movie
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/project/findAll"]} component={ProjectsList} />
              <Route exact path="/add" component={AddProject} />
              <Route path="/project/:id" component={Project} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
