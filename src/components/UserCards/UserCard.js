import React from "react";
import { Link } from "react-router-dom";

import "./UserCard.css";
import calculateAge from "../../functions/calculateAge";

const UserCard = props => {
  let userCard;
  if (props.user) {
    userCard = (
      <Link to={"/partner-profile/" + props.user.id} className="card img-card">
        <img
          src={props.user.image_uri}
          alt={props.user.nickname}
          className="img-small"
        />
        <div className="user-card__text-holder">
          <p>{props.user.nickname}</p>
          <p className="user-card__text-age">
            {calculateAge(props.user.birthday)}歳
          </p>
        </div>
      </Link>
    );
  }

  return userCard;
};

export default UserCard;
