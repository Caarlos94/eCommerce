import { useState, useEffect } from "react";
import QAAnsweredQuestion from "./QAAnsweredQuestion";
import classes from "./QAAnsweredQuestions.module.css";
//Aquí irán las preguntas que hayan sido respondidas
const QAAnsweredQuestions = ({ productId }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/customerQA/${productId}`)
      .then((data) => data.json())
      .then((data) => setQuestions(data));
  }, [productId]);
// console.log(questions);
  return (
    <div className={classes["questions-container"]}>
      <div className={classes["titulo-preguntas"]}>Última preguntas: </div>
      {/* {questions?.map((q) => (
        <QAAnsweredQuestion key={q.questionId} questionData={q} />
      ))} */}
    </div>
  );
};

export default QAAnsweredQuestions;
