import { useState, useEffect } from "react";
import QAAnsweredQuestion from "./QAAnsweredQuestion";
import classes from "./QAAnsweredQuestions.module.css";

const QAAnsweredQuestions = ({ productId }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    fetch(`http://localhost:3001/customerQA/${productId}`)
      .then((data) => data.json())
      .then((data) => {
        if (isSubscribed) setQuestions(data);
      });

    return () => (isSubscribed = false);
  }, [productId]);
  return (
    <div className={classes["questions-container"]}>
      <div className={classes["titulo-preguntas"]}>Últimas preguntas: </div>
      {questions?.map((q) => (
        <QAAnsweredQuestion key={q.questionId} questionData={q} />
      ))}
      {!questions.length ? (
        <p>Aún no se han hecho preguntas sobre este producto</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default QAAnsweredQuestions;
