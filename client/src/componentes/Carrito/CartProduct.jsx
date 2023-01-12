import React from 'react';
import { NavLink } from 'react-router-dom';
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
  stock,
}) => {

  return (
    <div className={s.item}>
      <div
        className={s.itemImg}
        style={{ backgroundImage: `url(${URL[0]})` }}
      ></div>
      <div className={s.info}>
        <NavLink to={`details/${id}`} style={{ textDecoration: 'none' }}>
          <h2>{nombre}</h2>
        </NavLink>
        <h5>Stock: {--stock}</h5>
        <p>{talla}</p>
        <p>
          ${precio} x {cantidad} = ${precio*cantidad}
        </p>
      </div>
      <div className={s.btns}>
        <button onClick={() => handleDelete(id)}>-1</button>
        <button onClick={() => handleAdd(id)} disabled={stock <= 0}>+1</button>
        <button onClick={() => handleDelete(id, true)}>Eliminar todos</button>
      </div>
    </div>
  );
};

export default CartProduct;