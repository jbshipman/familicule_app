import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Header } from "semantic-ui-react";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header as="h1">DevCamp React Starter</Header>
        <Header as="h2">React Redux Router</Header>
      </div>
    );
  }
}
