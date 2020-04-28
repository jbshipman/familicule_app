import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      first_name: "",
      lastt_name: "",
      bio: "",
      birthday: "",
      loginErrors: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { username, password } = this.state;

    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            username: username,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        // console.log('resp from login', resp)
        if (resp.data.logged_in) {
          console.log(resp.data);
          this.props.handleSuccessfullAuth(resp.data);
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Login </button>
        </form>
      </div>
    );
  }
}
