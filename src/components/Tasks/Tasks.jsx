import axios from "axios";
import React, { Component } from "react";
import "./Tasks.css";
import timetable from "./timetable.png";
import email from "./email.png";
import term from "./term.png";
import flags from "./flags.png";
import bars from "./bars.png";
import home from "./home.png";
import add from "./add.png";
import logout from "./logout.png";
import { Link, Outlet } from "react-router-dom";

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout () {
    axios
    .post("http://127.0.0.1:8000/api/auth/token/logout/",{
    username: this.state.username,
    password: this.state.password,
  },
     {headers:{ Authorization: `Token ${localStorage.getItem("token")}`}})
    .then((res)=> {
      localStorage.clear()
      window.location.assign('/')
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <>
        <div className="app-layout">
          <nav>
            <ul className="left_list">
              <li>
               <img src={bars} alt="" />
              </li>
              <li>
                <img src={home} style={{ height: 25 }} alt="" />
              </li>
              <li>
                <div className="search">
                  <input type="text" placeholder="Rechercher" />
                </div>
              </li>
            </ul>

            <ul className="right_list">
              <li>
                <img src={add} style={{ height: 32 }} alt="" />
              </li>
              <li>
                <img onClick={this.logout}  src={logout} style={{ height: 25 }} alt="" />
              </li>
            </ul>
          </nav>
          <div className="app-container">
            <span className="sidebar">
              <ul>
                <ul>
                  <li>
                    <img src={email} alt="" />
                    <Link to="all">
                      <h4>Boite de réception</h4>
                    </Link>
                  </li>
                  <li>
                    <img src={timetable} alt="" />
                    <Link to="today">
                      <h4>Aujourd'hui</h4>
                    </Link>
                  </li>
                  <li>
                    <img src={term} alt="" />
                    <Link to="today">
                    <h4>Prochainement</h4>
                    </Link>
                  </li>
                  <li>
                    <img src={flags} alt="" />
                    <Link to="today">
                    <h4>Filtres et étiquettes</h4>
                    </Link>
                  </li>
                </ul>
              </ul>
            </span>
            <span className="board">
              <div className="board-container">
                <Outlet/>
              </div>
            </span>
          </div>
        </div>
      </>
    );
  }
}
