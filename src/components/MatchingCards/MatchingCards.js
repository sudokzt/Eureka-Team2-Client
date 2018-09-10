import React from "react";
import { Link } from "react-router-dom";

import MatchingCard from "./MatchingCard";

const MatchingCards = props => {
  let matchingCards;
  if (props.matchingUsers) {
    matchingCards = props.matchingUsers.map(user => (
      <Link to={"/talk/" + user.id} key={user.id}>
        <MatchingCard matchingUser={user} />
      </Link>
    ));
  }

  return matchingCards;
};

export default MatchingCards;
