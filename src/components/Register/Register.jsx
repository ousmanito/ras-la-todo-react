import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import errorLogo from "../Login/error.svg";
import axios from "axios";
import { withRouter } from "../withRouter";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isAuth: true
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleMailChange = this.handleMailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handlePW2Change = this.handlePW2Change.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
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

  handleMailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePWChange(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handlePW2Change(e) {
    this.setState({
      re_password: e.target.value,
    });
  }
  handleRegisterSubmit(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/auth/users/", {
        username: this.state.username,
        password: this.state.password,
        re_password: this.state.re_password
      })
      .then((res) => {
        console.log(res)
        localStorage.setItem("user_details", JSON.stringify(res.data));
        axios
          .post("http://127.0.0.1:8000/api/auth/token/login/", {
            username: res.data.username,
            password: this.state.password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.auth_token);
            this.props.navigate("/tasks/all");
          });
      })
      .catch((err) => {
        this.setState({
          isAuth: false
        })
      });
  }

  render() {
    return (
      <>
        <ul style={{padding: 30}}>
          <Link to="/">
          <img src="" alt="LOGO"></img>
          </Link>
        </ul>

        <div className="auth-layout" style={{
          marginTop: '2%'
        }}>
          <h1>Créer un compte</h1>
          {!this.state.isAuth && (<div className="error-box">
            <img
              className="error-logo"
              src={errorLogo}
              alt=""
              style={{ height: 30, padding: 15 }}
            />
            <h4> Il y a un problème quelque part ...</h4>
          </div>)}
          <form name="register-form">
              <label>
                <h3>Nom d'utilisateur :</h3>
                <input type="text" onChange={this.handleUserChange}></input>
              </label>
              <label>
                <h3>Email :</h3>
                <input type="text" onChange={this.handleMailChange}></input>
              </label>
            <label>
              <h3>Mot de passe :</h3>
              <input type="password" onChange={this.handlePWChange}></input>
            </label>
            <label style={{
              marginBottom: 30
            }}>
              <h3>Retaper le mot de passe :</h3>
              <input type="password" onChange={this.handlePW2Change}></input>
            </label>

            <button
              className="btn"
              type="submit"
              onClick={this.handleRegisterSubmit}
            >
              Valider
            </button>
          </form>
          <h4>
            Déjà un compte ?{" "}
            <u>
              <Link to="/login">Connectez-vous !</Link>
            </u>
          </h4>
        </div>
      </>
    );
  }
}

export default withRouter(Register);
