import React from 'react';
import style from './Card.module.css'

export default function Card({ name, image, id, branch, price}){
    return(
        <div className={style.card}>
            <img src={image} alt="Not found" className={style.img}/>
            <span className={style.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            <span className={style.branch}>{branch.charAt(0).toUpperCase() + branch.slice(1)}</span>
            <span className={style.price}></span>
        </div>
    )
}