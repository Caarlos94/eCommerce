import React from 'react';
import './cards.css';
import { NavLink } from 'react-router-dom';

function Card({ nombre, URL, marca, precio, categoria, id }) {
  return (
    <NavLink to={`/details/${id}`} style={{ textDecoration: 'none' }}>
      <div className="card text-center">
        <div
          className="overflow"
          style={{ backgroundImage: `url(${URL})` }}
        ></div>

        <div className="card-body">
          <h3 className="card-title">{nombre}</h3>
          <h5 className="h55">{marca}</h5>
          <h4 className="h44">${precio}</h4>
          <p className="card-text text-secondary">
            {categoria ? categoria : 'Este producto no posee categoría.'}
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default Card;
