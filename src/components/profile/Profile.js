import React, { Component } from "react";
import { Form } from "semantic-ui-react";

export default class Profile extends Component {
  render() {
    return (
      <div>
        <h2>Profile</h2>
        <div>{this.props.profile.firstname}</div>
        <div>{this.props.profile.lastname}</div>
        <div>{this.props.profile.bio}</div>
        <div>{this.props.profile.birthday}</div>
      </div>
    );
  }
}
