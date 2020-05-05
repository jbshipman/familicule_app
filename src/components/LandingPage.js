import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import axios from "axios";

import { Header } from "semantic-ui-react";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: true,
    };

    this.handleSuccessfullAuth = this.handleSuccessfullAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleShowRegistation = this.handleShowRegistation.bind(this);
  }

  handleSuccessfullAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
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
    this.props.history.push("/");
  }

  handleShowRegistation() {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Familicules</h1>
        {this.state.showLogin ? (
          <Login handleSuccessfullAuth={this.handleSuccessfullAuth} />
        ) : (
          <Registration handleSuccessfullAuth={this.handleSuccessfullAuth} />
        )}
        <div className="clearfix">
          <p
            className="text-center"
            onClick={() => this.handleShowRegistation()}
          >
            <a href="#">
              {this.state.showLogin ? "Create an Account" : "Log in"}
            </a>
          </p>
        </div>

        <p className="text-center" onClick={() => this.handleLogoutClick()}>
          <a href="#">Logout</a>
        </p>
        <p className="text-center status">
          Status: {this.props.loggedInStatus} {""}
          {this.props.user.username ? this.props.user.username : ""}
        </p>
      </div>
    );
  }
}
