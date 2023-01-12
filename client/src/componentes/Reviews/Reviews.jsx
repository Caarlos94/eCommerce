import React from 'react';
import s from './Reviews.module.css';

const Reviews = ({ reviews }) => {
  return (
    <div className={s.revCont}>
      <h2>Opiniones del producto:</h2>
      {reviews && (
        <div className={s.revs}>
          {reviews.map((rev) => (
            <div key={rev.id} className={s.revBox}>
              {/* <h4>Puntaje: {rev.rating}</h4> */}
              {console.log(reviews)}
              {(() => {
                if (rev.rating === '5') {
                  return <h4>★★★★★</h4>;
                } else if (rev.rating === '4') {
                  return <h4>★★★★</h4>;
                } else if (rev.rating === '3') {
                  return <h4>★★★</h4>;
                } else if (rev.rating === '2') {
                  return <h4>★★</h4>;
                } else if (rev.rating === '1') {
                  return <h4>★</h4>;
                } else {
                  return 'no funciona';
                }
              })()}
              <h5>Comentario: {rev.comment}</h5>
              <label>Fecha: {rev.fecha.split('', 10)}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
// FALTA AGREGAR MENSAJE PARA CUANDO NO HAYA NINGUNA REVIEW

export default Reviews;
