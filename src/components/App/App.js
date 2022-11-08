import React from "react";
import QuestionHistory from "../QuestionHistory/QuestionHistory";
import classes from "./App.module.css";
import { getLocalStorage } from "../../utils/localStorage";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      needAnswer: false,
      answers: [
        "Да",
        "Нет",
        "Возможно",
        "Вопрос не ясен",
        "Абсолютно точно",
        "Никогда",
        "Даже не думай",
        "Сконцентрируйся и спроси опять",
      ],
      questions: getLocalStorage(`${this.props.userName}`),
    };
  }

  addQuestion(e) {
    this.setState({ needAnswer: false });
    this.setState({ question: e.target.value });
  }
  giveAnswer() {
    this.setState({ needAnswer: true });
    this.setState({
      questions: [...this.state.questions, this.state.question],
    });
    console.log(this.state.questions);
    this.setState({ question: "" });
  }
  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.setState({ needAnswer: true });
      this.setState({
        questions: [...this.state.questions, this.state.question],
      });

      this.setState({ question: "" });
      this.setState({ question: "" });
    }
  }
  render() {
    return (
      <div className={classes.container}>
        <h1> User: {this.props.userName}</h1>
        <button
          className={classes.button}
          onClick={() => this.props.logout(this.state.questions)}
        >
          Выйти
        </button>

        <div className={classes.ballDiv}>
          <p className={classes.answers}>
            {this.state.needAnswer
              ? this.state.answers[
                  Math.floor(Math.random() * this.state.answers.length)
                ]
              : "Задайте вопрос"}
          </p>
        </div>
        <div className={classes.inputDiv}>
          <input
            value={this.state.question}
            onChange={this.addQuestion.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            className={classes.inputQuestion}
            placeholder="Введите вопрос"
          />
          <p>
            {this.state.question && (
              <button
                onClick={this.giveAnswer.bind(this)}
                className={classes.btn}
              >
                Получить ответ
              </button>
            )}
          </p>
        </div>
        <p>
          <QuestionHistory questions={this.state.questions} />
        </p>
        <p>
          {this.state.questions &&
            `Этот вопрос задан ${
              this.state.questions.filter((e) => e === this.state.question)
                .length
            } раз`}
        </p>
      </div>
    );
  }
}

export default App;
