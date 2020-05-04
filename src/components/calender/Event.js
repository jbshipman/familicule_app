import React, { Component } from "react";

export default class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curentEvents: [],
    };

    this.showEventCards = this.showEventCards.bind(this);
  }

  componentDidMount() {
    this.setState({
      curentEvents: this.props.events.filter(
        (ev) => ev.cule_id === this.props.cule.id
      ),
    });
    this.showEventCards();
  }

  showEventCards() {
    // this.setState({
    //   currentEvents: this.props.events.filter(
    //     (ev) => ev.cule_id === this.props.cule.id
    //   ),
    // });

    return this.state.curentEvents.map((evt) => (
      <div>
        <h5>{evt.title}</h5>
        <p>
          {evt.date} at {evt.time}
        </p>
        <p>Location: {evt.location}</p>
        <p>Details: {evt.details}</p>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div>
          <h4>What's happening in our Cule:</h4>
          <div>
            <div className="event_cards">{this.showEventCards()}</div>
          </div>
        </div>
      </div>
    );
  }
}
