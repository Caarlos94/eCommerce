import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import StarRating from "./StarRating";
import "./ReviewForm.css";
import classes from "./ReviewForm2.module.css";

const ReviewForm = () => {
  const location = useLocation();
  const { clienteId, producto } = location.state;

  const [didSend, SetDidSent] = useState(false);
  const [markedRating, setMarkedRating] = useState(0);
  const [comments, setComments] = useState("");
  const ratingNameValues = [
    "Muy malo",
    "Malo",
    "Aceptable",
    "Bueno",
    "Excelente",
  ];

  const [ratingNameValue, setRatingNameValue] = useState("");

  const ratingColors = ["red", "orange", "yellow", "greenyellow", "green"];

  const [ratingColor, setRatingColor] = useState("");

  const [responseError, setResponseError] = useState({
    error: false,
    msg: "",
  });

  const [commentError, setCommentError] = useState({
    error: false,
    msg: "",
  });

  const handleRating = (addedRating) => {
    setMarkedRating(addedRating);

    setRatingNameValue(ratingNameValues[addedRating - 1]);
    setRatingColor(ratingColors[addedRating - 1]);
  };

  const handleChange = (e) => {
    setComments(e.target.value);
  };

  const handleClick = () => {
    const postInfo = {
      comment: comments,
      rating: markedRating,
      clienteId,
      productoId: producto.productoId,
    };

    if (postInfo.comment.length < 10 || postInfo.rating === 0) return;

    fetch("http://localhost:3001/compras/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postInfo),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) return setResponseError({ error: true, msg: data.msg });
        console.log(data);
      });

    console.log(postInfo);
    setComments("");
    SetDidSent(true);
  };

  return (
    <>
      {!didSend ? (
        <div className={classes.container}>
          <p className={classes.nombre}>{producto.nombre}</p>
          <div className={classes["review-container"]}>
            <div className={classes["left-side"]}>
              <img src={producto.url} alt={producto.nombre} />
            </div>
            <div className={classes["right-side"]}>
              <div className={classes["rating-container"]}>
                <p className={classes["bold-text"]}>
                  ¿Qué puntuación le darías?
                </p>
                <div className="star-rating">
                  <StarRating handleRating={handleRating} />
                </div>
                <div
                  className={`${classes["rating-name"]} ${
                    ratingColor && classes[ratingColor]
                  }`}
                >
                  {ratingNameValue}
                </div>
              </div>
              <div className={classes["comments-container"]}>
                <p className={classes["bold-text"]}>
                  Comparte tus comentarios:
                </p>
                <textarea value={comments} onChange={handleChange}></textarea>
              </div>
              <div className={classes["review-btn"]}>
                <button onClick={handleClick}>Enviar</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {didSend && !responseError.error ? <p>Enviado!</p> : ""}
      {responseError.error ? <p>{responseError.msg}</p> : ""}
    </>
  );
};

export default ReviewForm;
