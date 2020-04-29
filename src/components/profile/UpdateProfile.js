import React, { Component } from "react";
import { Form } from "semantic-ui-react";

export default class ProfileUpdate extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      bio: "",
      birthday: "",
      updateErrors: "",
    };
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
          user: {
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
          this.props.handleSuccessfullAuth(resp.data);
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
        {/* A form will go here. */}
        <form>
          <div>
            <div>
              <p>
                <label>First name</label>
              </p>
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                value={this.state.first_name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <p>
                <label>Last name</label>
              </p>
              <input
                type="text"
                name="last_name"
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
            {/* <div>
              <p>
                <label>Birthday</label>
              </p>
              <input
                type="text"
                name="Birthday"
                placeholder="dd-mm-yyyy"
                // pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])-(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])-(?:30))|(?:(?:0\[13578\]|1\[02\])-31))"
                value={this.state.birthday}
                onChange={this.handleChange}
              />
            </div> */}
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
        </form>
        {/* <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="First name" placeholder="First name" />
            <Form.Input fluid label="Last name" placeholder="Last name" />
            <Form.Input fluid label="Birthday" placeholder="Birthday" />
            <Form.TextArea label="Bio" placeholder="Bio" />
          </Form.Group>
          <button type="submit">Update Profile </button>
        </Form> */}
      </div>
    );
  }
}
