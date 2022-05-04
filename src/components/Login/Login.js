import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../withRouter";
import "./Login.css";
import errorLogo from './error.svg'

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      token: "",
      isWrong: null,
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  componentWillUnmount() {
      this.setState({
          isWrong: null
      })
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
        this.setState({
          token: res.data.auth_token,
          isWrong: false
        });
        this.props.navigate('/tasks', {state: {token : res.data.auth_token}})
      })
      .catch((err) => {
        console.log(err);
      });

    if (this.state.isWrong === false) {
    } 
    else if(this.state.isWrong === true) {
      this.setState({
        isWrong: true,
      });
    }
  }

  render() {
    return (
      <>
        <ul className="login-nav">
          <img src="" alt="LOGO"></img>
          <Link to="/">
            <button className="btn">Acceuil</button>
          </Link>
        </ul>
        <div className="auth-layout">
          <h1>Connexion</h1>
          {this.state.isWrong === true && 
          <div style={{display:'flex', alignItems:'center', border:'1px solid white', borderRadius:'1.618vw', padding: 9}}>
              <img src={errorLogo} style={{height:30, padding:15}} alt="" ></img>
              <h4 style={{color:'#E97D92'}}>Il y a un problème quelque part ...</h4>
          </div>
          }
          <form name="login-form">
            <div className="form-item">
              <label>
                <h3>Nom d'utilisateur :</h3>
                <input type="text" onChange={this.handleUserChange}></input>
              </label>
              <label>
                <h3>Mot de passe :</h3>
                <input type="password" onChange={this.handlePWChange}></input>
              </label>
              <button
                className="btn"
                style={{ height: "45px", marginTop: "30px" }}
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
