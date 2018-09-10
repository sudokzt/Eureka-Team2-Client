import React from "react";

import "./UserCards.css";
import UserCard from "./UserCard";

const UserCards = props => {
  let userCards = <p>Loading...</p>;
  if (props.users) {
    if (props.users.length > 0) {
      userCards = props.users.map(user => (
        <UserCard key={user.id} user={user} />
      ));
    } else {
      userCards = <p>Your search list is empty.</p>;
    }
  }

  return <div className="card-list">{userCards}</div>;
};

export default UserCards;
