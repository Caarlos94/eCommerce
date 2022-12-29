import React from 'react';
import s from './CartProduct.module.css';

const CartProduct = ({
  handleDelete,
  handleAdd,
  nombre,
  talla,
  precio,
  cantidad,
  URL,
  id,
  stock
}) => {
  return (
    <div className={s.item}>
      <div
        className={s.itemImg}
        style={{ backgroundImage: `url(${URL})` }}
      ></div>
      <div className={s.info}>
        <h2>{nombre}</h2>
        <h5>Stock: {--stock}</h5>
        <p>{talla}</p>
        <p>
          ${precio} x {cantidad} = ${precio * cantidad}
        </p>
      </div>
      <div className={s.btns}>
        <button onClick={() => handleDelete(id)}>-1</button>
        <button onClick={() => handleAdd(id)}>+1</button>
        <button onClick={() => handleDelete(id, true)}>Eliminar todos</button>
      </div>
    </div>
  );
};

export default CartProduct;
