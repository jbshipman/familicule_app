import React, { Component } from "react";

export default class Cule extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.cule.name}</h3>
        <p>Holds all additional components: Events, Tasks, Messages, etc.</p>
        <div></div>
      </div>
    );
  }
}
