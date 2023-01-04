import { useState, useEffect } from "react";
import classes from "./QAForm.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const QAForm = (props) => {
  const [didSubmit, setDidSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [data, setData] = useState({ newQuestion: "", email: "" });
  const [didSaveEmail, setDidSaveEmail] = useState(false);

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const { user } = useAuth0();
  useEffect(() => {
    if (user) setEmail(user.email);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/customerQA/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: props.productId,
        newQuestion: data.newQuestion,
        email: email ? email : data.email,
      }),
    });
    setDidSubmit(true);
    setData((prevState) => ({ ...prevState, newQuestion: "" }));
    data.email.length && setDidSaveEmail(true);
  };

  const handleClick = () => {
    setDidSubmit(false);
  };

  return !didSubmit ? (
    <div className={classes["form-cont"]}>
      <form className={classes["form-container"]} onSubmit={handleSubmit}>
        <label className={classes["form-label"]} htmlFor="newQuestion">
          Preguntar al vendedor:
        </label>
        <input
          className={classes["form-input"]}
          autoComplete="off"
          placeholder="Ej: Hay stock disponible?"
          onChange={handleChange}
          name="newQuestion"
          type="text"
          value={data.newQuestion}
        />
        {!user && !didSaveEmail ? (
          <div>
            <label htmlFor="email">
              Deja tu email para ser notificado cuando tengas unas respuesta
            </label>
            <input
              className={classes["form-input"]}
              autoComplete="off"
              placeholder="Ej: Hay stock disponible?"
              onChange={handleChange}
              name="email"
              type="text"
              value={data.email}
            />
          </div>
        ) : (
          ""
        )}

        <button
          className={classes["submit-button"]}
          disabled={!data.newQuestion.length}
          type="submit"
        >
          Enviar pregunta
        </button>
      </form>
    </div>
  ) : (
    <div className={classes["form-container"]}>
      <p className={classes["pregunta-enviada"]}>
        La pregunta fue enviada! Podrá verla apenas sea respondida...
      </p>
      <button className={classes["submit-button"]} onClick={handleClick}>
        Hacer otra pregunta
      </button>
    </div>
  );
};

export default QAForm;
