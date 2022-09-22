import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../withRouter";
import "./Login.css";
import errorLogo from "./error.svg";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWrong:
        localStorage.getItem("isWrong") == null
          ? null
          : localStorage.getItem("isWrong"),
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      window.location.assign("/tasks/all");
    }
  }

  handleUserChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePWChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/auth/token/login/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem("user_details", JSON.stringify(res));
        localStorage.setItem("token", res.data.auth_token);
        localStorage.setItem("isWrong", false);
        axios
         .get("http://127.0.0.1:8000/api/auth/users/me", {
          headers : {Authorization: `Token ${localStorage.getItem('token')}`}
         }).then((res) => {
          let user_details = JSON.parse(localStorage.getItem('user_details'))
          user_details['id'] = res.data.id
          localStorage.setItem('user_details', JSON.stringify(user_details))
         })
        this.props.navigate("/tasks/all");
      })
      .catch((err) => {
        this.setState({
          isWrong: true,
        });
      });
  }

  render() {
    return (
      <>
        <ul style={{ padding: 30 }}>
          <Link to="/">
            <img src="" alt="LOGO"></img>
          </Link>
        </ul>
        <div className="auth-layout">
          <h1>Connexion</h1>
          {this.state.isWrong === true && (
            <div className="error-box">
              <img
                className="error-logo"
                src={errorLogo}
                style={{ height: 30, padding: 15 }}
                alt=""
              ></img>
              <h4>Il y a un problème quelque part ...</h4>
            </div>
          )}
          <form name="login-form">
            <div className="form-item">
              <label>
                <h3>Nom d'utilisateur :</h3>
                <input type="text" onChange={this.handleUserChange}></input>
              </label>
              <label
                style={{
                  marginBottom: 30,
                }}
              >
                <h3>Mot de passe :</h3>
                <input type="password" onChange={this.handlePWChange}></input>
              </label>
              <button
                className="btn"
                type="submit"
                onClick={this.handleLoginSubmit}
              >
                Se connecter
              </button>
            </div>
          </form>
          <h4>
            Pas encore de compte ?{" "}
            <u>
              <Link to="/register">Inscrivez-vous !</Link>
            </u>
          </h4>
        </div>
      </>
    );
  }
}
export default withRouter(Login);
