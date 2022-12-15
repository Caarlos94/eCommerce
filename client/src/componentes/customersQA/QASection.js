import React from "react";
import QAAnsweredQuestions from "./QAAnsweredQuestions";
import QAForm from "./QAForm";
import classes from "./QASection.module.css";

const QASection = (props) => {
  return (
    <div className={classes["QASection-container"]}>
      <div className={classes["answered-questions"]}>
        <div></div>
        <QAAnsweredQuestions productId={props.productId} />
        <div></div>
      </div>
      <QAForm productId={props.productId} />
    </div>
  );
};

export default QASection;
