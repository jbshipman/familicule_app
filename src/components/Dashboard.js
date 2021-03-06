import React, { Component } from "react";
import Profile from "./profile/Profile";
import UpdateProfile from "./profile/UpdateProfile";

import axios from "axios";

import { Header } from "semantic-ui-react";
import { BrowserRouter, Switch } from "react-router-dom";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      revealThings: false,
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleShowUpdateProfile = this.handleShowUpdateProfile.bind(this);
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

  handleShowUpdateProfile() {
    // console.log("updated profile button has been pushed");
    this.setState({ revealThings: !this.state.revealThings });
    // e.preventDefault();
  }
  // all components for the entire app live at this level
  render() {
    return (
      <div>
        <div>
          <h1>Hello {this.props.profile.firstname}</h1>
          <div>{this.props.user.email}</div>
          <Profile
            user={this.props.user}
            profile={this.props.profile}
            loggedInStatus={this.props.loggedInStatus}
            handleShowUpdateProfile={this.handleShowUpdateProfile}
          />
          {this.state.revealThings ? (
            <UpdateProfile
              user={this.props.user}
              profile={this.props.profile}
              loggedInStatus={this.props.loggedInStatus}
              handleSuccessfullAuth={this.props.handleSuccessfullAuth}
              handleShowUpdateProfile={this.handleShowUpdateProfile}
            />
          ) : null}
          <button onClick={() => this.handleShowUpdateProfile()}>
            Update Profile
          </button>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
          <h6>
            Status: {this.props.loggedInStatus}, as username:{" "}
            {this.props.user.username}
          </h6>
        </div>
      </div>
    );
  }
}
