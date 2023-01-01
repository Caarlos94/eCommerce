import { useState, useEffect, useRef } from "react";
import QAAnsweredQuestion from "./QAAnsweredQuestion";
import classes from "./QAAnsweredQuestions.module.css";

const QAAnsweredQuestions = ({ productId }) => {
  const [questions, setQuestions] = useState([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!mountedRef.current) {
      return null;
    }
    fetch(`http://localhost:3001/customerQA/${productId}`)
      .then((data) => data.json())
      .then((data) => {
        setQuestions(data);
      });

    return () => {
      mountedRef.current = false;
    };
  }, [productId]);
  return (
    <div className={classes["questions-container"]}>
      <div className={classes["titulo-preguntas"]}>Última preguntas: </div>
      {questions?.map((q) => (
        <QAAnsweredQuestion key={q.questionId} questionData={q} />
      ))}
    </div>
  );
};

export default QAAnsweredQuestions;
