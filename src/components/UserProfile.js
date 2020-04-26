import React from "react";
import { Header } from "semantic-ui-react";

const UserProfile = () => {
  return (
    <div>
      <div>
        <Header as="h1">Profile</Header>
        <div>User information displayed below</div>
        <button>Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
