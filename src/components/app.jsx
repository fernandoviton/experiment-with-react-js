import React, { Component } from 'react';
import './app.css';
import ResponseList from '../containers/responseList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ResponseList/>
      </div>
    );
  }
}

export default App;
