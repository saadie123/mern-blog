import React, { Component } from "react";
import Navbar from "./components/UI/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "./components/User/Login/Login";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>My App</h1>
        <Switch>
          <Route path="/login" component={Login} />;
        </Switch>
      </div>
    );
  }
}

export default App;
