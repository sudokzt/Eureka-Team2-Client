import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import logoutBtn from '../images/logout-btn-gray.svg';

const Header = props => {
  let currentPage = null;
  if (props.currentPage) {
    currentPage = props.currentPage;
  }

  let logout = null;
  if (currentPage === 'Search') {
    logout = (
      <Link to="/login" className="header__btn-holder">
        <img src={logoutBtn} alt="log out" className="header__btn" />
      </Link>
    );
  }

  return (
    <div className="header">
      <h3>{currentPage}</h3>
      {logout}
    </div>
  );
};

export default Header;
