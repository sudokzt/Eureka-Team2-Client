import React from "react";

import "./MatchingCard.css";
import calculateAge from "../../functions/calculateAge";

const MatchingCard = props => {
  let matchingUser;
  if (props.matchingUser) {
    matchingUser = (
      <div className="card matching-card">
        <div className="matching-card__img-holder">
          <img
            src={props.matchingUser.image_uri}
            alt={props.matchingUser.nickname}
            className="matching-card__img"
          />
        </div>
        <div className="matching-card__text-holder">
          <p>{props.matchingUser.nickname}</p>
          <p>{calculateAge(props.matchingUser.birthday)}歳</p>
          <p className="maching-card__text-holder__intro">
            {props.matchingUser.introduction.slice(0, 12)}
            ...
          </p>
        </div>
      </div>
    );
  }

  return matchingUser;
};

export default MatchingCard;
