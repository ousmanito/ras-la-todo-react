import React, { Component } from "react";
import "./Header.css";
import cover from './cover-artwork.webp'

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
        <button>Commencer !</button>
        <img alt = "" src={cover}></img>
      </div>
    </header>
    );
  }
}
