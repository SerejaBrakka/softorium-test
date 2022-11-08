import React from "react";

class QuestionHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        История вопросов:
        {this.props.questions &&
          this.props.questions.map((e, i) => (
            <div key={i}>
              <p>{e}</p>
            </div>
          ))}
      </>
    );
  }
}

export default QuestionHistory;
