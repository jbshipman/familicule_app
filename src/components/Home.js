import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import axios from "axios";

import { Header } from "semantic-ui-react";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfullAuth = this.handleSuccessfullAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfullAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/profile");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((resp) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div>
        <h1>HOME</h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <br />
        <br />
        <Registration handleSuccessfullAuth={this.handleSuccessfullAuth} />
        <Login handleSuccessfullAuth={this.handleSuccessfullAuth} />
        <br />
        <br />
        <br />
        <br />
        <h6>
          Status: {this.props.loggedInStatus} {""}
          {this.props.user.username ? this.props.user.username : ""}
        </h6>
      </div>
    );
  }
}
