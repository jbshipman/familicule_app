import React, { Component } from "react";
import { Form } from "semantic-ui-react";

export default class Profile extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     profileUpdated: false;
  //   }

  // }

  render() {
    return (
      <div>
        <div>{this.props.profile.firstname}</div>
        <div>{this.props.profile.lastname}</div>
        <div>{this.props.profile.bio}</div>
        <div>{this.props.profile.birthday}</div>
        {/* <button onClick={() => this.handleShowUpdateProfile()}>
          Update Profile
        </button> */}
      </div>
    );
  }
}
