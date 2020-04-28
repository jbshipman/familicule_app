import React, { Component } from "react";
import Profile from "./profile/Profile";
import UpdateProfile from "./profile/UpdateProfile";

import axios from "axios";

import { Header } from "semantic-ui-react";
import { BrowserRouter, Switch } from "react-router-dom";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
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
  // all components for the entire app live at this level
  render() {
    return (
      <div>
        <div>
          <h1>Hello {this.props.profile.first_name}</h1>
          <div>{this.props.user.email}</div>
          <Profile user={this.props.user} profile={this.props.profile} />
          {/* <UpdateProfile /> */}
          {/* <BrowserRouter>
            <Switch>
              <Route
                exact
                path={"/dashboard/profile"}
                render={(props) => <Profile />}
              />
              <Route
                exact
                path={"/dashboard/updateprofile"}
                render={(props) => <UpdateProfile />}
              />
            </Switch>
          </BrowserRouter> */}
          {/* <UpdateProfile /> */}
          <br />
          <br />
          <br />
          <br />
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
