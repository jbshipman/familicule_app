import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";

export default class CuleList extends Component {
  // personalCuleNameDisplay = () => {
  //   if (this.props.cule.name === this.props.user.username) {
  //     return (
  //       <Link exact path={"/dashboard"}>
  //         Home
  //       </Link>
  //     );
  //   } else {
  //     return (
  //       <Link exact path={"/cule"}>
  //         {this.props.cule.name}
  //       </Link>
  //     );
  //   }
  // };

  render() {
    return (
      <div>
        {/* {this.personalCuleNameDisplay()} */}
        <div>
          <Link to={`/dashboard/cules/${this.props.cule.name}`}>
            {this.props.cule.name}
          </Link>
        </div>
        <div>
          <Switch>
            <Route
              exact
              path={`/dashboard/cules/${this.props.cule.name}`}
              render={(props) => (
                <Cule
                  {...props}
                  user={this.state.user}
                  profile={this.state.profile}
                  cule={this.state.cule}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogout={this.handleLogout}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
