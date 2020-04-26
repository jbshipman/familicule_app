import React, { Component } from "react";
import axios from "axios";

import { Header } from "semantic-ui-react";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios
      .delete(`${prodURL}logout`, { withCredentials: true })
      .then((resp) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <div>
          <Header as="h1">Hello {this.props.user.username}</Header>
          <div>{this.props.user.email}</div>
          <br />
          <br />
          <br />
          <br />
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
          <h6>
            Status: {this.props.loggedInStatus}, as {this.props.user.username}
          </h6>
        </div>
      </div>
    );
  }
}
