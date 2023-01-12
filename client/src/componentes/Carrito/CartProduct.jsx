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
          <p className={s.talle}>Talle: {talla}</p>
        </NavLink>
      </div>
      <div className={s.precios}>
        <div className={s.preciodiv}>
          <p className={s.precioTitle}>Precio</p>
          <p className={s.precio}>${precio}</p>
        </div>
        <div className={s.btns}>
          <button onClick={() => handleDelete(id)}>-1</button>
          <span className={s.span}>{cantidad}</span>
          <button onClick={() => handleAdd(id)} disabled={stock <= 0}>
            +1
          </button>
        </div>

        <div className={s.stdiv}>
          <p className={s.stTitle}>Subtotal</p>
          <p className={s.stotal}>${precio * cantidad}</p>
        </div>
      </div>

      <div className={s.btnX}>
        <button onClick={() => handleDelete(id, true)}>X</button>
      </div>
    </div>
  );
};

export default CartProduct;
