import React from "react";
import QAAnsweredQuestions from "./QAAnsweredQuestions";
import QAForm from "./QAForm";

const QASection = (props) => {
  return (
    <>
      <QAAnsweredQuestions productId={props.productId} />
      <QAForm productId={props.productId} />
    </>
  );
};

export default QASection;
