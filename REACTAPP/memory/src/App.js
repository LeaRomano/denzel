import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import OneMovie from "./MesCompo/OneMovie";

class App extends Component {
  render() {
    return (
      <div className="App" className="App-body">
        <h1>Denzel movies</h1>
        <p>
          Each time you will refresh this page, we will give you a selection of
          three of the best film of Denzel 🍿
        </p>
        <OneMovie />
        <h5>© Léa Romano</h5>
      </div>
    );
  }
}

export default App;
