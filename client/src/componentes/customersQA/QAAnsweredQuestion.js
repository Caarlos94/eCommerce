import React from "react";

const QAAnsweredQuestion = ({ questionData }) => {
  return (
    <div>
      <p>{questionData.question}</p>
      <p>{questionData.answer}</p>
    </div>
  );
};

export default QAAnsweredQuestion;
