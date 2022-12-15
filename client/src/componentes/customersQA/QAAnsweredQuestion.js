import React from "react";
import classes from "./QAAnsweredQuestion.module.css";

const QAAnsweredQuestion = ({ questionData }) => {
  return (
    <div className={classes["questions-container"]}>
      <p className={classes.question}>{questionData.question}</p>
      <p className={classes.answer}>{questionData.answer}</p>
    </div>
  );
};

export default QAAnsweredQuestion;
