import React, { Component } from "react";
import Event from "./calender/Event";
import CreateEvent from "./calender/CreateEvent";
import axios from "axios";

export default class Cule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      revealCrateEvent: false,
      // culeEvents: [],
    };
    this.handleShowCreateEvent = this.handleShowCreateEvent.bind(this);
    // this.getAllEvents = this.getAllEvents.bind(this);
  }

  handleShowCreateEvent() {
    this.setState({ revealCrateEvent: !this.state.revealCrateEvent });
  }

  componentDidMount() {
    let filterEvents = this.props.events;
    filterEvents.filter((event) => event.cule_id === this.props.cule.id);
    this.setState({
      culeEvents: filterEvents,
    });
  }

  render() {
    return (
      <div>
        <h3>{this.props.cule.name}</h3>

        <div>
          <Event
            user={this.props.user}
            profile={this.props.profile}
            cule={this.props.cule}
            events={this.props.events}
            handleShowCreateEvent={this.handleShowCreateEvent}
          />

          {this.state.revealCrateEvent ? (
            <CreateEvent
              user={this.props.user}
              profile={this.props.profile}
              cule={this.props.cule}
              events={this.state.events}
            />
          ) : null}
        </div>

        <button onClick={() => this.handleShowCreateEvent()}>
          {this.state.revealCrateEvent ? "Don't Create" : "Create"} Event
        </button>
      </div>
    );
  }
}
