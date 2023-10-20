import React from "react";
import { Link } from "react-router-dom";

//import styles
import "../styles/navbar.css";

import logo from "../images/plane.png";

export default function Navbar() {
  return (
    <div className="navbar_container">
      <img src={logo} className="nav_logo"></img>
      <div className="nav_item">
        <Link to="/tracking" className="nav_link">
          Tracking
        </Link>
      </div>
      <div className="nav_item">
        <Link to="/login" className="nav_link">
          Login
        </Link>
      </div>
    </div>
  );
}
