import React, { Component } from "react";
import axios from "axios";

import { Header } from "semantic-ui-react";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulLogOut = this.handleSuccessfulLogOut.bind(this);
  }

  handleSuccessfulLogOut(data) {
    this.props.handleLogout(data);
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <div>
          <Header as="h1">Hello</Header>
          <div>User information displayed below</div>
          <button>Edit Profile</button>
          <br />
          <br />
          <br />
          <br />
          <button onClick={() => this.handleSuccessfulLogOut()}>Logout</button>
          <h6>
            Status: {this.props.loggedInStatus}, as {this.props.user.username}
          </h6>
        </div>
      </div>
    );
  }
}
