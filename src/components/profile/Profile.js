import React, { Component } from "react";
import { Form } from "semantic-ui-react";

export default class Profile extends Component {
  render() {
    return (
      <div>
        <h3>Profile</h3>
        <div>
          {this.props.profile.firstname} {this.props.profile.lastname}
        </div>
        <div>Birthday: {this.props.profile.birthday}</div>

        <div className="big-margin">
          <div>Bio:</div>
          {this.props.profile.bio}
        </div>
      </div>
    );
  }
}
