import React from 'react';
import style from './Card.module.css'
import { getProducts } from '../../redux/actions/actions'

export default function Card({ name, image, id, branch, price}){
    return(
        <div className={style.card}>
            <img src={image} alt="Not found" className={style.img}/>
            <span className={style.name}>{getProducts.name.charAt(0).toUpperCase() + getProducts.name.slice(1)}</span>
            <span className={style.branch}>{branch.charAt(0).toUpperCase() + branch.slice(1)}</span>
            <span className={style.price}></span>
        </div>
    )
}