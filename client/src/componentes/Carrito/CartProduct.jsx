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
        style={{ backgroundImage: `url(${URL})` }}
      ></div>
      <div className={s.info}>
        <NavLink to={`details/${id}`} style={{ textDecoration: 'none' }}>
          <p className={s.nombre}>{nombre}</p>
        </NavLink>
        <p className={s.precio}>
          ${precio} x {cantidad} = ${precio*cantidad}
        </p>
        <p className={s.stock}>Stock: {--stock}</p>
        <p className={s.talla}>Talle: {talla}</p>
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