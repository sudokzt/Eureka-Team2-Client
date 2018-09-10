import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";
import searchBtn from "../images/search-btn.svg";
import searchBtnGreen from "../images/search-btn-selected-green.svg";
import likeBtn from "../images/like-btn.svg";
import likeBtnGreen from "../images/like-btn-selected-green.svg";
import talkBtn from "../images/talk-btn.svg";
import talkBtnGreen from "../images/talk-btn-selected-green.svg";

const Footer = props => {
  return (
    <div className="footer">
      <ul>
        <Link to="/search">
          <li>
            {props.currentPage === "search" ? (
              <img src={searchBtnGreen} alt="search" className="footer__btn" />
            ) : (
              <img src={searchBtn} alt="search" className="footer__btn" />
            )}
          </li>
        </Link>
        <Link to="/approached">
          <li>
            {props.currentPage === "approached" ? (
              <img
                src={likeBtnGreen}
                alt="approached"
                className="footer__btn"
              />
            ) : (
              <img src={likeBtn} alt="approached" className="footer__btn" />
            )}
          </li>
        </Link>
        <Link to="/matching">
          <li>
            {props.currentPage === "matching" ? (
              <img src={talkBtnGreen} alt="matching" className="footer__btn" />
            ) : (
              <img src={talkBtn} alt="matching" className="footer__btn" />
            )}
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Footer;
