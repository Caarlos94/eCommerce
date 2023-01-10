import React from 'react';
import './cards.css';
import { NavLink } from 'react-router-dom';

function Card({ nombre, URL, marca, precio, categoria, id }) {
  return (
    <div>
    <NavLink to={`/details/${id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        <div
          className="overflow"
          style={{ backgroundImage: `url(${URL})`, backgroundSize: `100%` }}
        ></div>

        <div className="card-body">
          <p className="h55">{marca}</p>
          <p className="h44">${precio}</p>
          <p className="card-title">{nombre}</p>
          {/* <p className="card-text text-secondary">
            {categoria ? categoria : 'Este producto no posee categoría.'}
          </p> */}
          <p></p>
          <p></p>
          <p className='cuotas'>Hasta 24 cuotas con Mercado Pago</p>
        </div>
      </div>
    </NavLink>
    </div>
  );
}

export default Card;
