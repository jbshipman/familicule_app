import React, { Component } from "react";
import Profile from "./profile/Profile";
import UpdateProfile from "./profile/UpdateProfile";
import CuleList from "./CuleList";
import axios from "axios";
import CreateCule from "./CreateCule";
import Cule from "./Cule";
import SelfCule from "./SelfCule";
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";
import { Grid } from "semantic-ui-react";
// import semantic from "semantic-ui-react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      revealUpdateProfile: false,
      revealCreateCule: false,
      showSelfCule: true,
      showOtherCule: false,
      displayProfile: true,
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

  handleHideProfile() {
    this.setState({
      displayProfile: !this.state.displayProfile,
    });
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
            <Link
              // handleHideProfile={this.handleHideProfile}
              // onClick={this.handleHideProfile}
              to={`${path}/${c.name}`}
              key={idx}
            >
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
      <div className="container-style">
        <Grid columns={2} divided className="small-push">
          <Grid.Row>
            <Grid.Column width={4}>
              <div className="">
                <h3>Hello</h3>
                <div>{this.props.user.email}</div>
              </div>
              <div className="">
                <div id="cule_select_group">
                  <button
                    className="btn-primary"
                    onClick={() => this.handleShowCreateCule()}
                  >
                    Create a Cule
                  </button>

                  <h6>Your 'cules:</h6>

                  <BrowserRouter>{this.showCules()}</BrowserRouter>

                  {this.state.revealCreateCule ? (
                    <CreateCule
                      user={this.props.user}
                      profile={this.props.profile}
                      loggedInStatus={this.props.loggedInStatus}
                      handleShowCreateCule={this.handleShowCreateCule}
                    />
                  ) : null}
                </div>
              </div>
              <div className="push-lower">
                <p onClick={() => this.handleLogoutClick()}>
                  <a href="#">Logout</a>
                </p>
                <p className="status">
                  Status: {this.props.loggedInStatus} {""}
                  {this.props.user.username ? this.props.user.username : ""}
                </p>
              </div>
            </Grid.Column>
            <Grid.Column width={12} className="need-margin">
              <div>
                {this.state.showSelfCule &&
                !this.state.showOtherCule &&
                this.state.displayProfile ? (
                  <div id="profile_group" className="">
                    <h3 className="profile-margin">Profile</h3>
                    <button
                      className="btn-primary"
                      onClick={() => this.handleShowUpdateProfile()}
                    >
                      {this.state.revealUpdateProfile
                        ? "Don't Update"
                        : "Update"}
                      Profile
                    </button>

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
                  </div>
                ) : null}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
