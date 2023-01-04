import React, { useEffect, useState } from 'react';
import style from './historialUsuario.module.css';
import { Link } from 'react-router-dom';






const Compras = (props) => {
    


     return(
            <div key={props.nombre} className={style.div}>
               <img src={props.URL} alt="imagen de producto"/>
               <h4>{props.nombre}</h4>
               <h5>marca:  {props.marca}</h5>
               <h5>fecha:  {props.fecha}</h5>
               <h5>precio:   {props.precio}</h5>
               <h5>talla:    {props.talla}</h5>
               <h5>numero de envio:  {props.localizador}</h5>

              <Link to={{pathname:'/review-form' , state:{producto:props}}}>
                <button>aca va la logica del review</button>
               </Link>  
          </div>
    )
}

export default Compras;