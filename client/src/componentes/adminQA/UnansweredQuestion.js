import { useState } from "react";
import classes from "./UnansweredQuestion.module.css";

const UnansweredQuestion = ({ question }) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/adminQA", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionId: question.questionId, answer }),
    });
  };

  return !question.answer ? (
    <div>
      <div>
        <p>Nombre del producto: {question.productName}</p>
        <img src={question.productUrl} alt="nombre del producto" />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="respuesta">Pregunta: {question.question}</label>
        <input
          autoComplete="off"
          onChange={handleChange}
          name="respuesta"
          type="text"
        />
        <button type="submit">Enviar respuesta</button>
      </form>
    </div>
  ) : (
    ""
  );
};

export default UnansweredQuestion;
