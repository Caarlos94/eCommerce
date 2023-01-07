import { useState, useEffect } from "react";
import classes from "./QAForm.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const QAForm = (props) => {
  const [didSubmit, setDidSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [data, setData] = useState({ newQuestion: "", email: "" });
  const [didSaveEmail, setDidSaveEmail] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState("");
  const [timer, setTimer] = useState(null);

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

    clearTimeout(timer); // reinicia el timer

    const newTimer = setTimeout(() => {
      // toDo: No notificar validez si no hay un correo en el input de correo
      if (e.target.name === "email") {
        //eslint-disable-next-line
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
          setEmailIsValid(true);
        } else {
          setEmailIsValid(false);
        }
      }
    }, 700);

    setTimer(newTimer);
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
        <div className={classes["inputs-container"]}>
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
            <>
              <label htmlFor="email">
                Deja tu email para ser notificado cuando haya una respuesta
              </label>
              <input
                className={classes["form-input"]}
                autoComplete="off"
                placeholder="Ej: usuario@email.com (Opcional)"
                onChange={handleChange}
                name="email"
                type="text"
                value={data.email}
              />
              {emailIsValid === false && data.email.length ? (
                <p>Correo inválido</p>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>

        <button
          className={classes["submit-button"]}
          disabled={!data.newQuestion.length || (!emailIsValid && true)}
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
