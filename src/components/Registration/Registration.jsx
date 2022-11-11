import React from "react";
import classes from "./Registration.module.css";
import App from "../App/App";
import { Link } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class Registration extends React.Component {
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
    createUserWithEmailAndPassword(
      auth,
      this.state.userName,
      this.state.password
    )
      .then((userCredential) => {
        this.setState({ isAuth: true });
      })
      .catch((error) => {
        alert(error);
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
              <h2>Регистрация</h2>
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
                  <span>Регистрация</span>
                </button>
                <span>
                  Уже есть аккаунт ? <Link to="/auth">Авторизоваться</Link>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Registration;
