import React, { Component } from "react";
import "./NavBar.css";
import bars from "./bars-solid.svg";
import cross from "./xmark-solid.svg";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  render() {
    return (
      <>
        <nav className="navbar">
          <div className="nav-container">
            <img className="nav-logo" alt="LOGO"></img>
            <ul>
              <li>About</li>
              <li>Courses</li>
              <li>Contact</li>
            </ul>
            <img className="bars" src={bars} onClick={this.toggleMenu}></img>
          </div>
          <div className="navbar-2">
            <ul className="list-2">
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
            <img className="cross" src={cross} onClick={this.toggleMenu}></img>
          </div>
        </nav>
      </>
    );
  }
  toggleMenu () {
    const bars = document.querySelector(".bars")
    const cross = document.querySelector(".cross")
    const nav = document.querySelector(".navbar-2")

    nav.classList.toggle("showSecond")

  }
}
