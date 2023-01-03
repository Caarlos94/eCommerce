import React from 'react';
import s from './Reviews.module.css';

const Reviews = () => {
  return (
    <div className={s.reviewsCont}>
      <h2>Opiniones del producto</h2>
      <div className={s.rCont}>
        <div className={s.stars}>
          <h3>4.8 ⭐⭐⭐⭐⭐</h3>
        </div>
        <div className={s.revText}></div>
      </div>
    </div>
  );
};

export default Reviews;
