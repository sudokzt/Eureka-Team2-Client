import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import logoutBtn from '../images/logout-btn-gray.svg';

const Header = props => {
  let currentPage = null;
  if (props.currentPage) {
    currentPage = props.currentPage;
  }
  let timeLimit = 0;
  if (props.timeLimit) {
    timeLimit = Number(props.timeLimit);
  }

  let logout = null;
  if (currentPage === 'Search') {
    logout = (
      <Link to="/login" className="header__btn-holder">
        <img src={logoutBtn} alt="log out" className="header__btn" />
      </Link>
    );
  }

  if (currentPage === 'ZeroCrasher') {
    // timer
    let min = ('00' + Math.floor(timeLimit / 60)).slice(-2);
    let sec = ('00' + (timeLimit % 60)).slice(-2);
    return (
      <div className="timer__header">
        <h3>
          {min}:{sec}
        </h3>
      </div>
    );
  } else {
    return (
      <div className="header">
        <h3>{currentPage}</h3>
        {logout}
      </div>
    );
  }
};

export default Header;
