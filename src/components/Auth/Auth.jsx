import React from "react";
import classes from "./Auth.module.css";
import App from "../App/App";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      userName: "",
      users: [],
    };
  }
  login() {
    this.setState({
      isAuth: true,
      users: this.state.users.push({
        userName: this.state.userName,
        id: Date.now(),
      }),
    });
  }
  logout(items) {
    this.setState({
      isAuth: false,
      users: [],
    });
    localStorage.setItem(`${this.state.userName}`, items);
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
              <h2>Нужно авторизоваться</h2>
              <h2>Авторизация</h2>
              <div>
                <input
                  onChange={(e) => this.setState({ userName: e.target.value })}
                  placeholder="Введите имя"
                ></input>
              </div>

              <div>
                <button
                  className={classes.button}
                  onClick={this.login.bind(this)}
                >
                  <span>Войти</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Auth;
