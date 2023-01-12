import React, { useEffect, useState } from 'react';
import style from './Compras.module.css';
import { Link, NavLink } from 'react-router-dom';

const Compras = (props) => {
  const { enviado } = props;
  const [didReview, setDidReview] = useState(true);
  const { clienteId } = props;
  const productId = props.id;

  useEffect(() => {
    if (!clienteId || !productId) return;
    fetch(
      `https://suprasports.up.railway.app/compras/review-match?clienteId=${clienteId}&productoId=${productId}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(props);
        if (data.error === true) {
          setDidReview(true);
        } else {
          setDidReview(false);
        }
        // console.log(data);
      });
  }, [props, clienteId, productId]);

  return (
    <div key={props.nombre} className={style.div}>
      <div className={style.imgCont}>
        <div className={style.itemImg}>
          <img src={props.URL} alt="imagen de producto" />
        </div>
      </div>
      <div className={style.textCont}>
        <NavLink
          to={`/details/${productId}`}
          style={{ textDecoration: 'none' }}
        >
          <h4>{props.nombre}</h4>
        </NavLink>
        <h5>Marca: {props.marca}</h5>
        <h5>Fecha: {props.fecha}</h5>
        <h5>Precio: {props.precio}</h5>
        <h5>Talla: {props.talla}</h5>
        <h5>Cantidad: {props.cantidad}</h5>
        <h5>Numero de envio: {props.localizador}</h5>
        {enviado && !didReview ? (
          <Link
            to={{
              pathname: '/review-form',
              state: { producto: props, clienteId },
            }}
            style={{ textDecoration: 'none' }}
          >
            <button className={style.btnReview}>Dejar reseña</button>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Compras;
