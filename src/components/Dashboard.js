import React, { Component } from "react";
import Profile from "./profile/Profile";
import UpdateProfile from "./profile/UpdateProfile";
import CuleList from "./CuleList";
import axios from "axios";
import CreateCule from "./CreateCule";
import Cule from "./Cule";
import SelfCule from "./SelfCule";
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      revealUpdateProfile: false,
      revealCreateCule: false,
      showSelfCule: true,
      showOtherCule: false,
    };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleShowUpdateProfile = this.handleShowUpdateProfile.bind(this);
    this.handleShowCreateCule = this.handleShowCreateCule.bind(this);
    this.showCules = this.showCules.bind(this);
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })

      .then((resp) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
    this.props.history.push("/");
  }

  handleShowUpdateProfile() {
    this.setState({ revealUpdateProfile: !this.state.revealUpdateProfile });
  }

  handleShowCreateCule() {
    this.setState({ revealCreateCule: !this.state.revealCreateCule });
  }

  componentDidMount() {
    this.showCules();
  }

  showCules() {
    let cules = this.props.cule;
    const { path } = this.props.match;

    if (cules.length > 0) {
      // return cules.map((c, idx) => <p id={idx}>{c.name}</p>);
      return cules.map((c, idx) => (
        <div>
          <div>
            <Link to={`${path}/${c.name}`} key={idx}>
              {c.name}
            </Link>
          </div>
          <div>
            <Switch>
              <Route
                path={`${path}/${c.name}`}
                render={(props) => (
                  <Cule
                    {...props}
                    user={this.props.user}
                    profile={this.props.profile}
                    cule={c}
                    events={this.props.events}
                    loggedInStatus={this.props.loggedInStatus}
                    handleLogout={this.props.handleLogout}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      ));
    }
  }

  // all components for the entire app live at this level
  render() {
    const { path } = this.props.match;
    return (
      <div>
        <div>
          <h1>Hello {this.props.profile.firstname}</h1>
          <div>{this.props.user.email}</div>

          {this.state.showSelfCule && !this.state.showOtherCule ? (
            <div id="profile_group">
              {!this.state.revealUpdateProfile ? (
                <Profile
                  user={this.props.user}
                  profile={this.props.profile}
                  loggedInStatus={this.props.loggedInStatus}
                  handleShowUpdateProfile={this.handleShowUpdateProfile}
                />
              ) : null}
              {this.state.revealUpdateProfile ? (
                <UpdateProfile
                  user={this.props.user}
                  profile={this.props.profile}
                  loggedInStatus={this.props.loggedInStatus}
                  handleSuccessfullAuth={this.props.handleSuccessfullAuth}
                  handleShowUpdateProfile={this.handleShowUpdateProfile}
                />
              ) : null}
              <button onClick={() => this.handleShowUpdateProfile()}>
                {this.state.revealUpdateProfile ? "Don't Update" : "Update"}{" "}
                Profile
              </button>
            </div>
          ) : null}

          <div id="cule_select_group">
            <h2>Your 'cules:</h2>
            <BrowserRouter>{this.showCules()}</BrowserRouter>

            <button onClick={() => this.handleShowCreateCule()}>
              Create a Cule
            </button>
            {this.state.revealCreateCule ? (
              <CreateCule
                user={this.props.user}
                profile={this.props.profile}
                loggedInStatus={this.props.loggedInStatus}
                handleShowCreateCule={this.handleShowCreateCule}
              />
            ) : null}
          </div>

          <div id="the_cule"></div>

          <div id="side_footer">
            <button onClick={() => this.handleLogoutClick()}>Logout</button>
            <h6>
              Status: {this.props.loggedInStatus}, as {this.props.user.username}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}
