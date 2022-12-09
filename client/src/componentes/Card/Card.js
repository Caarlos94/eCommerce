import React from 'react';
import PropTypes from 'prop-types'
import './cards.css'



function Card({title, imgSource, branch, price, color, description, url}){
    return(
        <div className='card text-center'>
            
            <div className='overflow'>
                <img src={imgSource} alt='' className='card-img-top '/>
            </div>

            <div className='card-body'>
                <h3 className='card-title'>{title}</h3>
                <h5>{branch}</h5>
                <h4>Precio: {price}</h4>
                <h5>{color}</h5>
                <p className='card-text text-secondary'>
                    {
                    description ? description : 'Este producto no posee una descripcion'
                    }
                </p>
                <a href={url} className='btn btn-outline-secondary' target='_blank'>Go to ...</a>
            </div>

        </div>

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