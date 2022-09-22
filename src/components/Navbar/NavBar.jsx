import React, { Component } from "react";
import "./NavBar.css";
import bars from "./bars-solid.svg";
import cross from "./xmark-solid.svg";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  render() {
    return (
      <>
        <nav className="navbar">
          <div className="nav-container">
            <img className="nav-logo" alt="LOGO"></img>
            <ul>
              <li>Features</li>
              <li><Link to ="/login" >Connexion</Link></li>
              <li><Link to="/register" ><button className="btn">Créer un compte</button></Link></li>
            </ul>
            <img className="bars" alt ="" src={bars} onClick={this.toggleMenu}></img>
          </div>
          <div className="navbar-2">
            <ul className="list-2">
              <li>Features</li>
              <li>Connexion</li>
              <li>Créer un compte</li>
            </ul>
            <img className="cross" src={cross} alt = "" onClick={this.toggleMenu}></img>
          </div>
        </nav>
      </>
    );
  }
  toggleMenu () {
    const nav = document.querySelector(".navbar-2")

    nav.classList.toggle("showSecond")

  }
}
