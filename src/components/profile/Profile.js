import React, { Component } from "react";
import { Form } from "semantic-ui-react";

export default class Profile extends Component {
  constructor() {
    super();

    // this.state = {
    //   first_name: "",
    //   last_name: "",
    //   bio: "",
    //   birthday: "",
    //   updateErrors: "",
    // };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // console.log(event.target.name, event.target.value);
    // let key = event.target.name;
    // let value = event.target.value;
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    // console.log(e.target.value);
    let { first_name, last_name, bio, birthday } = this.setState;

    axios
      .post(
        "http://localhost:3001/profiles",
        {
          profile: {
            first_name: first_name,
            last_name: last_name,
            bio: bio,
            birthday: birthday,
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        if (resp.data.status === "updated") {
          // this.props.handleSuccessfullAuth(resp.data);
          this.props.history.push("/profile");
        }
      })
      .catch((error) => {
        console.log("update error", error);
      });

    event.preventDefault();
    // this.props.history.push("/profile");
  }

  render() {
    return (
      <div>
        <div>{this.props.profile.first_name}</div>
        <div>{this.props.profile.last_name}</div>
        <div>{this.props.profile.bio}</div>
        <div>{this.props.profile.birthday}</div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Update Profile </button>
        </form>
      </div>
    );
  }
}
