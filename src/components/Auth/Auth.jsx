import React from "react";
import classes from "./Auth.module.css";
import App from "../App/App";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      userName: "",
      password: "",
    };
  }

  login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.userName, this.state.password)
      .then((userCredential) => {
        this.setState({ isAuth: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  logout() {
    this.setState({
      isAuth: false,
      userName: "",
      password: "",
    });
  }

  render() {
    return (
      <div>
        {this.state.isAuth ? (
          <App
            userName={this.state.userName}
            logout={this.logout.bind(this)}
            isAuth={this.state.isAuth}
          />
        ) : (
          <div className={classes.authContainer}>
            <div className={classes.authForm}>
              <h2>Авторизация</h2>
              <div>
                <input
                  onChange={(e) => this.setState({ userName: e.target.value })}
                  placeholder="Введите email"
                ></input>
                <input
                  onChange={(e) => this.setState({ password: e.target.value })}
                  placeholder="Пароль не менее 6 знаков"
                  type="password"
                ></input>
              </div>
              <div>
                <button
                  className={classes.button}
                  onClick={this.login.bind(this)}
                >
                  <span>Войти</span>
                </button>
                <Link to="/">Регистрация </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Auth;
