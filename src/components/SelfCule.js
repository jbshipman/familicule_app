import React, { Component } from "react";
import Profile from "./profile/Profile";
import UpdateProfile from "./profile/UpdateProfile";

export default class SelfCule extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     revealUpdateProfile: false,
  //   };

  //   this.handleShowUpdateProfile = this.handleShowUpdateProfile.bind(this);
  // }

  // handleShowUpdateProfile() {
  //   this.setState({ revealUpdateProfile: !this.state.revealUpdateProfile });
  // }

  render() {
    return (
      <div>
        {/* <div id="profile_group">
          {!this.props.revealUpdateProfile ? (
            <Profile
              user={this.props.user}
              profile={this.props.profile}
              loggedInStatus={this.props.loggedInStatus}
              handleShowUpdateProfile={this.handleShowUpdateProfile}
            />
          ) : null}
          {this.props.revealUpdateProfile ? (
            <UpdateProfile
              user={this.props.user}
              profile={this.props.profile}
              loggedInStatus={this.props.loggedInStatus}
              handleSuccessfullAuth={this.props.handleSuccessfullAuth}
              handleShowUpdateProfile={this.handleShowUpdateProfile}
            />
          ) : null}
          <button onClick={() => this.props.handleShowUpdateProfile()}>
            Update Profile
          </button>
        </div> */}
      </div>
    );
  }
}
