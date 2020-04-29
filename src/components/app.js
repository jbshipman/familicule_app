import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      profile: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((resp) => {
        if (
          resp.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: resp.data.user,
            profile: resp.data.profile,
          });
        } else if (
          !resp.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        )
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
            profile: {},
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
      profile: {},
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
      profile: data.profile,
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
                <LandingPage
                  {...props}
                  user={this.state.user}
                  profile={this.state.profile}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                  // prodURL={this.prodURL}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={(props) => (
                <Dashboard
                  {...props}
                  user={this.state.user}
                  profile={this.state.profile}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogout={this.handleLogout}
                  // prodURL={this.prodURL}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
