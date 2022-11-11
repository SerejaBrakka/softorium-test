import React from "react";
import classes from "./BallAndInput.module.css";
class BallAndInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className={classes.ballDiv}>
          <p className={classes.answers}>
            {this.props.needAnswer
              ? this.props.answers[
                  Math.floor(Math.random() * this.props.answers.length)
                ]
              : "Задайте вопрос"}
          </p>
        </div>
        <div className={classes.inputDiv}>
          <input
            value={this.props.question}
            onChange={this.props.addQuestion}
            className={classes.inputQuestion}
            placeholder="Введите вопрос"
          />
        </div>
      </>
    );
  }
}

export default BallAndInput;
