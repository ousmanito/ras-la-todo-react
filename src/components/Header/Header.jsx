import React, { Component } from "react";
import "./Header.css";
import cover from './cover-artwork.webp'
import { Link } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
    <header>
      <div className="header-container">
        <h1>Gestionnaire de tâches</h1>
        <h2>
          Learn to code with our beginner-friendly tutorials and examples. Read
          tutorials, try examples, write programs, and learn to code.
        </h2>
        <Link to="/tasks/all"><button>Commencer !</button></Link>
        <img alt = "" src={cover}></img>
      </div>
    </header>
    );
  }
}
