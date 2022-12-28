import React from 'react';
import s from './FavoriteProduct.module.css';
import { NavLink } from 'react-router-dom';

const FavoriteProduct = ({ nombre, talla, precio, URL, id, handleDelete }) => {
  return (
    <div className={s.itemm}>
      <NavLink
        to={`/details/${id}`}
        style={{ textDecoration: 'none' }}
        className={s.item}
      >
        <div
          className={s.itemImg}
          style={{ backgroundImage: `url(${URL})` }}
        ></div>
        <div className={s.info}>
          <h2>{nombre}</h2>
          <p>{talla}</p>
          <p>${precio}</p>
        </div>
        <button onClick={() => handleDelete(id)}>X</button>
      </NavLink>
    </div>
  );
};

export default FavoriteProduct;
