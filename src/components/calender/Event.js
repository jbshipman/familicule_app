import React, { Component } from "react";
import moment from "moment";

export default class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curentEvents: [],
    };

    this.showEventCards = this.showEventCards.bind(this);
    // this.timeWarp = this.timeWarp.bind(this);
  }

  componentDidMount() {
    this.setState({
      curentEvents: this.props.events.filter(
        (ev) => ev.cule_id === this.props.cule.id
      ),
    });
    this.showEventCards();
  }

  // timeWarp(data) {
  //   const myRegex = /^(?:\S{11})(\S{8})/gm;
  //   const timeMatch = myRegex.exec(data);
  // }
  showEventCards() {
    // this.setState({
    //   currentEvents: this.props.events.filter(
    //     (ev) => ev.cule_id === this.props.cule.id
    //   ),
    // });

    return this.state.curentEvents.map((evt) => (
      // let dt = evt.time;
      // let myRegex = /^(?:\S{11})(\S{8})/gm;
      // let timeMatch = myRegex.exec(dt);

      <div className="ui card card-style">
        <div className="content">
          <h4 className="header card-header-style">{evt.title}</h4>
        </div>
        <div className="content">
          <div className="ui sub header">
            {/* <Moment format="MMM DD, YYYY">{evt.date}</Moment> */}
            <p>
              <b>When:</b> {evt.date} <b>at:</b> {evt.time}
            </p>
            {/* <Moment format="mm/dd/yyyy">{evt.date}</Moment> at{" "}
            <Moment format="hh:mm">{evt.time}</Moment> */}
          </div>
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">
                  <p>
                    <b>Location:</b> {evt.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="sumamry">
                  <p>
                    <b>Details:</b> {evt.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div>
          <h4>What's happening in our Cule:</h4>
        </div>
        <div>
          <div className="event_cards">{this.showEventCards()}</div>
        </div>
        <br />
      </div>
    );
  }
}
