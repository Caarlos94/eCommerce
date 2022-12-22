import React from 'react';
import s from './CartProduct.module.css';

const CartProduct = ({
  handleDelete,
  nombre,
  talla,
  precio,
  cantidad,
  URL,
  id,
}) => {
  return (
    <div className={s.item}>
      <div
        className={s.itemImg}
        style={{ backgroundImage: `url(${URL})` }}
      ></div>
      <div className={s.info}>
        <h2>{nombre}</h2>
        <p>Talle: {talla}</p>
        <p>
          ${precio} x {cantidad} = ${precio * cantidad}
        </p>
      </div>
      <div className={s.btns}>
        <button onClick={() => handleDelete(id)}>Eliminar uno</button>
        <button onClick={() => handleDelete(id, true)}>Eliminar todos</button>
      </div>
    </div>
  );
};

export default CartProduct;
