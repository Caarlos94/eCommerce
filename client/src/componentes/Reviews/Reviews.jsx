import React from 'react';
import s from './Reviews.module.css';

const Reviews = ({ reviews }) => {


  return (
    <div className={s.revCont}>
      <h2>Opiniones del producto</h2>
      {reviews && (
        <div className={s.revs}>
          {
            reviews.map(rev => (
              < div key = { rev.id } className = { s.revBox } >
              <h4>Puntaje: {rev.rating}</h4>
              <h5>Comentario: {rev.comment}</h5>
              <label>Fecha: {rev.fecha.split('', 10)}</label>
            </div>
      ))
        }
    </div>
  )
}
    </div >
  );
};

export default Reviews;
