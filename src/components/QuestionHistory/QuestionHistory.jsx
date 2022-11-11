import React from "react";

class QuestionHistory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        Моя история вопросов:
        {this.props.userAndHisMessage[this.props.userName] &&
          this.props.userAndHisMessage[this.props.userName].map((e, i) => (
            <div key={i}>
              <div>{e}</div>
            </div>
          ))}
      </>
    );
  }
}

export default QuestionHistory;
