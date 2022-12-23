import { useState } from "react";
import classes from "./UnansweredQuestion.module.css";

const UnansweredQuestion = ({ question, accessToken }) => {
  const [answer, setAnswer] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/adminQA", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ questionId: question.questionId, answer }),
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.error) {
          console.log(error);
          return;
        }
      });
    setDidSubmit(true);
  };

  // {
  //   url: `${apiServerUrl}/api/messages/admin`,
  //   method: "GET",
  //   headers: {
  //     "content-type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // }

  return !question.answer && !didSubmit ? (
    <div className={classes["admin-question"]}>
      <div className={classes["nombre-imagen"]}>
        <p>{question.productName}</p>
        <img src={question.productUrl} alt="nombre del producto" />
      </div>
      <form onSubmit={handleSubmit}>
        <label className={classes.label} htmlFor="respuesta">
          <p>Pregunta: </p>
          {question.question}
        </label>
        <br />
        <input
          autoComplete="off"
          onChange={handleChange}
          name="respuesta"
          type="text"
          value={answer}
        />
        <button disabled={!answer.length} type="submit">
          Enviar respuesta
        </button>
      </form>
    </div>
  ) : (
    ""
  );
};

export default UnansweredQuestion;
