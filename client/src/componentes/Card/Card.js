import React from 'react';
import './cards.css';
import { NavLink } from 'react-router-dom';

function Card({ nombre, URL, marca, precio, categoria, id }) {
    return (
        <NavLink to={`/details/${id}`} style={{ textDecoration: 'none' }}>
            <div className="card text-center">
                <div className="overflow" style={{ backgroundImage: `url(${URL})` }}>
                    {/* <img src={URL} alt="" className="card-img-top " /> */}
                </div>

                <div className="card-body">
                    <h3 className="card-title">{nombre}</h3>
                    <h5>{marca}</h5>
                    <h4>Precio: {precio}</h4>
                    <p className="card-text text-secondary">
                        {categoria ? categoria : 'Este producto no posee una descripcion'}
                    </p>
                </div>
            </div>
        </NavLink>
    );
}

export default Card;