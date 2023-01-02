import React from 'react';
import s from './FavoriteProduct.module.css';
import { NavLink } from 'react-router-dom';

const FavoriteProduct = ({ nombre, talla, precio, URL, id, handleDelete }) => {
  return (
    <div className={s.itemm}>
      <div className={s.item}>
        <NavLink
          to={`/details/${id}`}
          style={{ textDecoration: 'none' }}
          className={s.itemmm}
        >
          <div
            className={s.itemImg}
            style={{ backgroundImage: `url(${URL})` }}
          ></div>
        </NavLink>
        <div className={s.info}>
          <h2>{nombre}</h2>
          <p>{talla}</p>
          <p>${precio}</p>
        </div>
        <button onClick={() => handleDelete(id)}>X</button>
      </div>
    </div>
  );
};

export default FavoriteProduct;
