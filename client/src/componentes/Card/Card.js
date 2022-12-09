import React from 'react';
/* import PropTypes from 'prop-types' */
import './cards.css'
import { NavLink } from 'react-router-dom';




function Card({ nombre, URL, marca, precio, color, categoria, talla }) {
    return (
        <NavLink to='/details' style={{ textDecoration: 'none' }}>
            <div className='card text-center'>

                <div className='overflow'>
                    <img src={URL} alt='' className='card-img-top ' />
                </div>

                <div className='card-body'>
                    <h3 className='card-title'>{nombre}</h3>
                    <h5>{marca}</h5>
                    <h4>Precio: {precio}</h4>
                    {/* <h5>Color: {color}</h5>
                    <h5>Talla: {talla}</h5> */}
                    <p className='card-text text-secondary'>
                        {
                            categoria ? categoria : 'Este producto no posee una descripcion'
                        }
                    </p>
                    {/* <a href={} className='btn btn-outline-secondary' target='_blank'>Go to ...</a> */}
                </div>

            </div>
        </NavLink>
    )
}

/* Card.PropTypes = {
    title: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    branch: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
} */

export default Card