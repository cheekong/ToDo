import React, { Component } from 'react';

import Login from './containers/login/login';
import Signup from './containers/signup/signup';
import ToDo from './containers/todo/todo';
import Page from './containers/page/page';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Page />
      </div>
    );
  }
}

export default App;
