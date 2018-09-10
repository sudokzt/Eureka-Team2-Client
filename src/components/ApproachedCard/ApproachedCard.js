import React from "react";

import "./ApproachedCard.css";
import calculateAge from "../../functions/calculateAge";

const ApproachedCard = props => {
  let approachedCard;
  if (props.approachedUser) {
    const approachedUser = props.approachedUser;
    approachedCard = (
      <div className="card approached-card">
        <div className="approached-card__img-holder">
          <img
            src={approachedUser.image_uri}
            alt={approachedUser.nickname}
            className="approached-card__img"
          />
        </div>
        <div className="approached-card__text-holder">
          <h3>{approachedUser.nickname}</h3>
          <p>{calculateAge(approachedUser.birthday)}歳</p>
          <p>
            {approachedUser.residence_state}
            在住
          </p>
        </div>
      </div>
    );
  }

  return approachedCard;
};

export default ApproachedCard;
