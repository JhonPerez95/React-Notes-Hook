import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark  bg-dark p-3">
        <Link className="navbar-brand" to="/">
          Notes App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse  navbar-collapse" id="navbarNav">
          <ul className="navbar-nav  ml-auto">
            <li className="nav-item">
              <Link className="nav-link " to="/">
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/note/create">
                Create Note
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/create">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
