import React, { useState, useEffect } from "react";
import classes from "./StarRating.module.css";

const StarRating = ({ handleRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    handleRating(rating);
  }, [rating, handleRating]);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? classes.on : classes.off}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
