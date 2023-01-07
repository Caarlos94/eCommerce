import React, { useEffect, useState } from 'react';
import style from './Compras.module.css';
import { Link } from 'react-router-dom';

const Compras = (props) => {
  const { enviado } = props;
  const [didReview, setDidReview] = useState(true);
  const { clienteId } = props;
  const productId = props.id;

  useEffect(() => {
    if (!clienteId || !productId) return;
    fetch(
      `http://localhost:3001/compras/review-match?clienteId=${clienteId}&productoId=${productId}`
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.error === true) {
          setDidReview(true);
        } else {
          setDidReview(false);
        }
        // console.log(data);
      });
  }, [clienteId, productId]);

  return (
    <div key={props.nombre} className={style.div}>
      <div className={style.imgCont}>
        <img src={props.URL} alt="imagen de producto" />
      </div>
      <div className={style.textCont}>
        <h4>{props.nombre}</h4>
        <h5>Marca: {props.marca}</h5>
        <h5>Fecha: {props.fecha}</h5>
        <h5>Precio: {props.precio}</h5>
        <h5>Talla: {props.talla}</h5>
        <h5>Numero de envio: {props.localizador}</h5>
      </div>
      {enviado && !didReview ? (
        <Link
          to={{
            pathname: '/review-form',
            state: { producto: props, clienteId },
          }}
        >
          <button>aca va la logica del review</button>
        </Link>
      ) : (
        ''
      )}
    </div>
  );
};

export default Compras;
