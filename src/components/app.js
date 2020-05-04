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
      cule: [],
      events: [],
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // this.getUserCules = this.getUserCules.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((resp) => {
        // console.log(resp);
        if (
          resp.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: resp.data.user,
            profile: resp.data.profile,
            cule: resp.data.cule,
            events: resp.data.events,
          });
        } else if (
          !resp.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        )
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
            profile: {},
            cule: [],
            events: [],
          });
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  // getUserCules() {
  //   axios
  //     .get("http://localhost:3001/user_cule", { withCredentials: true })
  //     .then((resp) => console.log("got the user_cules", resp));
  // }

  componentDidMount() {
    this.checkLoginStatus();
    // this.getUserCules();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      profile: {},
      cule: [],
      events: [],
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
      profile: data.profile,
      cule: data.cule,
      events: data.events,
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
                  cule={this.state.cule}
                  events={this.state.events}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogout={this.handleLogout}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
