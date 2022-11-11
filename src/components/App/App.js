import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import QuestionHistory from "../QuestionHistory/QuestionHistory";
import classes from "./App.module.css";
import { getDocs } from "firebase/firestore";
import BallAndInput from "../BallAndInput/BallAndInput";

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
      questions: [],
      dataBaseQuestion: [],
      userAndHisMessage: {},
      myCurrentQuestions: [],
    };
  }

  async componentDidMount() {
    const querySnapshot = await getDocs(collection(db, "questions"));
    const questionsArr = [];
    querySnapshot.forEach((doc) => questionsArr.push(doc.data()));
    const message = [];
    questionsArr.map((e) => message.push(e.question));

    this.setState(
      {
        dataBaseQuestion: [...this.state.dataBaseQuestion, ...message],
      },
      () => {
        let obj = {};
        let key = "";
        questionsArr.map((e) => {
          key = e.user;
          obj[key] ? obj[key].push(e.question) : (obj[key] = [e.question]);
        });
        this.setState({
          userAndHisMessage: obj,
        });
      }
    );
  }

  addQuestion(e) {
    this.setState({ needAnswer: false, question: e.target.value });
  }

  async giveAnswer() {
    try {
      const docRef = await addDoc(collection(db, "questions"), {
        user: this.props.userName,
        question: this.state.question,
      });
    } catch (e) {
      alert("Error adding document: ", e);
    }
    this.setState({
      needAnswer: true,
      questions: [...this.state.questions, this.state.question],
      dataBaseQuestion: [...this.state.dataBaseQuestion, this.state.question],
      myCurrentQuestions: [
        ...this.state.myCurrentQuestions,
        this.state.question,
      ],
      question: "",
    });
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.cointainer__user}>
          <h3>User: {this.props.userName ? this.props.userName : "unknown"}</h3>
          <button
            className={classes.button}
            onClick={() => this.props.logout(this.state.questions)}
          >
            Выйти
          </button>
        </div>
        <div className={classes.ballAndInput__container}>
          <BallAndInput
            needAnswer={this.state.needAnswer}
            answers={this.state.answers}
            question={this.state.question}
            addQuestion={this.addQuestion.bind(this)}
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
        <div className={classes.allQuestions}>
          <div className={classes.myCurrentQuestions}>
            Мои текущие вопросы:
            {this.state.myCurrentQuestions.map((e, i) => (
              <div key={i}>{e}</div>
            ))}
          </div>
          <div className={classes.historyQuestions}>
            <QuestionHistory
              userAndHisMessage={this.state.userAndHisMessage}
              questions={this.state.questions}
              userName={this.props.userName}
            />
          </div>
          <div className={classes.historyOfAllUsers}>
            История вопросов всех пользователей:
            {this.state.dataBaseQuestion
              ? this.state.dataBaseQuestion.map((el, i) => (
                  <div key={i}>{el}</div>
                ))
              : "История вопросов пуста"}
          </div>
          <div className={classes.countQuestions}>
            {this.state.questions &&
              `Пользователи задали этот вопрос ${
                this.state.dataBaseQuestion.length
                  ? this.state.dataBaseQuestion.filter(
                      (e) => e === this.state.question
                    ).length
                  : 0
              } раз`}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
