import React from "react";
import { Link } from "react-router-dom";

const ConditionalRender = () => {
  if (sessionStorage.getItem("ltk")) {
    if (sessionStorage.getItem("role") === "Admin") {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/bookings">
              Your Bokings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link active">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-link active">
              Admin
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/bookings">
              Your Bokings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link active">
              Profile
            </Link>
          </li>
        </ul>
      );
    }
  } else {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
          <Link to="/login" className="nav-link active">
            Login/Signup
          </Link>
        </li>
      </ul>
    );
  }
};

export default ConditionalRender;
