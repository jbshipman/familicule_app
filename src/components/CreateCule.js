import React, { Component } from "react";
import axios from "axios";

export default class CreateCule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit() {
    // patch request
    // url route
    const { name } = this.state;
    axios
      .post(
        "http://localhost:3001/cules",
        {
          cule: {
            name: name,
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        if (resp.data.status === "created") {
          console.log("cule has been crated for the user", resp.data);
          this.props.handleShowCreateCule();
        }
      })
      .catch((error) => {
        console.log("create cule error", error);
      });

    // ensures form is hidden upon submit
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Cule name</label>
          <input
            type="text"
            name="name"
            placeholder="enter a name"
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}
