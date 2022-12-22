import { useState } from "react";
import classes from "./QAForm.module.css";

const QAForm = (props) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);

  const handleChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/customerQA/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: props.productId, newQuestion }),
    });
    setDidSubmit(true);
    setNewQuestion("");
  };

  const handleClick = () => {
    setDidSubmit(false);
  };

  return !didSubmit ? (
    <div>
      <form className={classes["form-container"]} onSubmit={handleSubmit}>
        <label className={classes["form-label"]} htmlFor="pregunta">
          Preguntar al vendedor:
        </label>
        <input
          className={classes["form-input"]}
          autoComplete="off"
          placeholder="Ej: Hay stock disponible?"
          onChange={handleChange}
          name="pregunta"
          type="text"
          value={newQuestion}
        />
        <button
          className={classes["submit-button"]}
          disabled={!newQuestion.length}
          type="submit"
        >
          Enviar pregunta
        </button>
      </form>
    </div>
  ) : (
    <div className={classes["form-container"]}>
      <p className={classes["pregunta-enviada"]}>La pregunta fue enviada! Podrá verla apenas sea respondida...</p>
      <button className={classes["submit-button"]} onClick={handleClick}>
        Hacer otra pregunta
      </button>
    </div>
  );
};

export default QAForm;
