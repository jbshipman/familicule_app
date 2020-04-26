import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import UserProfile from "./UserProfile";
import axios from "axios";

const prodURL = "https://familicule-api.herokuapp.com/";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios
      .get(`${prodURL}logged_in`, { withCredentials: true })
      .then((resp) => {
        if (
          resp.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: resp.data.user,
          });
        } else if (
          !resp.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        )
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Home
                  {...props}
                  user={this.state.user}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                  prodURL={this.prodURL}
                />
              )}
            />
            <Route
              exact
              path={"/profile"}
              render={(props) => (
                <UserProfile
                  {...props}
                  user={this.state.user}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogout={this.handleLogout}
                  prodURL={this.prodURL}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
