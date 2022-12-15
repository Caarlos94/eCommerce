import { useState } from "react";

const QAForm = (props) => {
  const [newQuestion, setNewQuestion] = useState("");

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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pregunta">Preguntar al vendedor: </label>
        <input
          autoComplete="off"
          onChange={handleChange}
          name="pregunta"
          type="text"
        />
        <button type="submit">Enviar pregunta</button>
        <p>{newQuestion}</p>
      </form>
    </div>
  );
};

export default QAForm;
