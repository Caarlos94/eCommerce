import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import StarRating from './StarRating';
import classes from './ReviewForm.module.css';

const ReviewForm = () => {
  const location = useLocation();
  const { producto, clienteId } = location.state;
  const [didClick, setDidClick] = useState(false);
  const [didSend, SetDidSent] = useState(false);
  const [markedRating, setMarkedRating] = useState(0);
  const [comments, setComments] = useState('');
  const ratingNameValues = [
    'Muy malo',
    'Malo',
    'Aceptable',
    'Bueno',
    'Excelente',
  ];

  console.log(clienteId);

  const history = useHistory();
  const handleHistory = () => {
    history.push('/historial'); //RUTA PROVISIONAL. REALMENTE DEBE A LA RUTA DE HISTORIAL DE COMPRAS
  };

  const [ratingNameValue, setRatingNameValue] = useState('');

  const ratingColors = ['red', 'orange', 'yellow', 'greenyellow', 'green'];

  const [ratingColor, setRatingColor] = useState('');

  const [responseError, setResponseError] = useState({
    error: false,
    msg: '',
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
    setDidClick(true);
    const postInfo = {
      comment: comments,
      rating: markedRating,
      clienteId,
      productoId: producto.id,
    };

    if (postInfo.rating === 0) {
      // setRatingError((prevState) => ({ ...prevState, error: true }));
      return;
    }

    fetch('https://suprasports.up.railway.app/compras/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postInfo),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) return setResponseError({ error: true, msg: data.msg });
        console.log(data);
      });

    console.log(postInfo);
    setComments('');
    SetDidSent(true);
    setTimeout(() => {
      handleHistory();
    }, 1000);
  };

  return (
    <div className={classes.starCont}>
      {!didSend ? (
        <div className={classes.container}>
          <p className={classes.nombre}>{producto.nombre}</p>
          <div className={classes["review-container"]}>
            <div className={classes["left-side"]}>
              <img src={producto.URL} alt={producto.nombre} />
            </div>
            <div className={classes['right-side']}>
              <div className={classes['rating-container']}>
                <p className={classes['bold-text']}>
                  ¿Qué puntuación le darías?
                </p>
                <div className={classes['star-rating']}>
                  <StarRating handleRating={handleRating} />
                </div>
                <div
                  className={`${classes['rating-name']} ${
                    ratingColor && classes[ratingColor]
                  }`}
                >
                  {ratingNameValue}
                </div>
              </div>
              <div className={classes['comments-container']}>
                <p className={classes['bold-text']}>
                  Comparte tus comentarios:
                </p>
                <textarea value={comments} onChange={handleChange}></textarea>
              </div>
              <div className={classes['review-btn']}>
                <button onClick={handleClick}>Enviar</button>
              </div>
              <div className={classes.warning}>
                {markedRating === 0 && didClick ? (
                  <p>Debe puntuarse el producto</p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {didSend && !responseError.error ? (
        <div className={classes['enviado-container']}>
          <div className={classes.enviado}>
            <p>Gracias por dejar tu opinión!</p>
          </div>
        </div>
      ) : (
        ''
      )}
      {responseError.error ? <p>{responseError.msg}</p> : ''}
    </div>
  );
};

export default ReviewForm;
