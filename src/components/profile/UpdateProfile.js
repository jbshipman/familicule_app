import React, { Component } from "react";
import axios from "axios";
import { Form } from "semantic-ui-react";

export default class ProfileUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      bio: "",
      birthday: "",
      updateErrors: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(event) {
    // console.log(e.target.value);
    // const { firstname, lastname, bio, birthday } = this.setState;
    // const uId = this.props.user.id;
    const pId = this.props.profile.id;
    // console.log(this.state);

    axios
      .patch(
        // "http://localhost:3001/profiles",
        `http://localhost:3001/profiles/${pId}`,
        {
          profile: {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            bio: this.state.bio,
            birthday: this.state.birthday,
            // user_id: this.props.user.id,
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        // console.log(this.state);
        if (resp.data.status === "updated") {
          console.log("profile has been updated", resp.data.profile);
          this.props.handleShowUpdateProfile();
          // this.props.handleSuccessfullAuth(resp.data);
        }
      })
      .catch((error) => {
        console.log("update error", error);
        // alert("update error", error);
      });

    // event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <p>
                <label>First name</label>
              </p>
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                value={this.state.firstname}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <p>
                <label>Last name</label>
              </p>
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                value={this.state.last_name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <p>
                <label>Birthday</label>
              </p>
              <input
                type="text"
                name="birthday"
                placeholder="yyyy-mm-dd"
                value={this.state.birthday}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <p>
                <label>Bio</label>
              </p>
              <textarea
                type="textarea"
                name="bio"
                placeholder="Add a bio to your profile if you so wish"
                value={this.state.bio}
                onChange={this.handleChange}
              ></textarea>
            </div>
          </div>
          <button type="submit">Save Profile</button>
        </form>
      </div>
    );
  }
}
