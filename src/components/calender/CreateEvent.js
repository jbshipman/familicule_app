import React, { Component } from "react";
import axios from "axios";

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      date: "",
      time: "",
      location: "",
      details: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(event) {
    const { title, date, time, location, details } = this.state;
    const cule = this.props.cule;

    axios
      .post(
        "http://localhost:3001/events",
        {
          event: {
            title: title,
            date: date,
            time: time,
            location: location,
            details: details,
            cule_id: cule.id,
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        // console.log(this.state);
        if (resp.data.status === "created") {
          console.log("event has been created", resp.data.event);
          this.props.handleShowCreateEvent();
        }
      })
      .catch((error) => {
        console.log("created event error", error);
      });
    // allow for the refresh so as to view the new profile data
    // event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="ui card card-style">
              <p>
                <label>Title</label>
              </p>
              <input
                type="text"
                name="title"
                placeholder="event title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <p>
                <label>Date</label>
              </p>
              <input
                type="date"
                name="date"
                placeholder="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
              <p>
                <label>Time</label>
              </p>
              <input
                type="time"
                name="time"
                placeholder="event time"
                value={this.state.time}
                onChange={this.handleChange}
              />
              <p>
                <label>Location</label>
              </p>
              <input
                type="text"
                name="location"
                placeholder="event location"
                value={this.state.location}
                onChange={this.handleChange}
              />
              <p>
                <label>Details</label>
              </p>
              <textarea
                type="text"
                name="details"
                placeholder="event details"
                value={this.state.details}
                onChange={this.handleChange}
              />
              <div>
                <br />
                <button className="btn-primary" type="submit">
                  Save Event
                </button>
                <br />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
