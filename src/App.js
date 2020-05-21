import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';

class App extends Component {
  constructor() {
    super();
    
  }

  render() {
    return (
      <div className="App">
            <Home />
      </div>
    )
  }
}

export default App;