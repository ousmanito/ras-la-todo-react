import React, { Component } from "react";
import "./Header.css";
import headerImage from "./header-image.jpg"
import cover from './cover-artwork.webp'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
    <header>

      <div className="header-container" style={{backgroundImage : `url()`}}>
        <h1>Learn to Code for Free !</h1>
        <h2>
          Learn to code with our beginner-friendly tutorials and examples. Read
          tutorials, try examples, write programs, and learn to code.
        </h2>
        <button>See Courses</button>
        <img src={cover}></img>
      </div>

    </header>
    );
  }
}
