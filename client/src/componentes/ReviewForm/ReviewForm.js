import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import StarRating from "./StarRating";
import "./ReviewForm.css";
import classes from "./ReviewForm2.module.css";

const ReviewForm = () => {
  const location = useLocation();
  const { clienteId, producto } = location.state;
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

  const handleRating = (addedRating) => {
    setMarkedRating(addedRating);

    setRatingNameValue(ratingNameValues[addedRating - 1]);
  };

  const handleChange = (e) => {
    setComments(e.target.value);
  };

  const handleClick = () => {
    const postInfo = {
      comments,
      rating: markedRating,
      clienteId,
      productoId: producto.productoId,
    };

    if (postInfo.comments.length < 10 || postInfo.rating === 0) return;

    console.log(postInfo);
    setComments("");
  };

  return (
    <div className={classes["review-container"]}>
      <div className={classes["left-side"]}>
        <p>{producto.nombre}</p>
        <div className={classes["img-container"]}>
          <img src={producto.url} alt={producto.nombre} />
        </div>
      </div>
      <div className={classes["right-side"]}>
        <div className={classes["rating-container"]}>
          <p>¿Qué puntuación le darías?</p>
          <div className="star-rating">
            <StarRating handleRating={handleRating} />
          </div>
          <div className="rating-name">{ratingNameValue}</div>
        </div>
        <div className={classes["comments-container"]}>
          <p>Comparte tus comentarios:</p>
          <textarea value={comments} onChange={handleChange}></textarea>
        </div>
        <button onClick={handleClick}>Enviar</button>
      </div>
    </div>
  );
};

export default ReviewForm;
