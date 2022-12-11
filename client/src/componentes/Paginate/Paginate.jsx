/* import React from 'react'
import style from './Paginate.module.css'

const Paginate = (props) => {
    
    const items = props.items.map((item,index) => {
        return <li key={item.id}>{item.title}</li>
    })
    
    return (
        <div>
            <button onClick={props.prevHandler}>Prev</button>
            <h2>{props.currentPage}</h2>
            <button onClick={props.nextHandler}>Next</button>
            <ul>
                {items}
            </ul>
        </div>
    )
}

export default Paginate; */

import React from "react";
import "./Paginate.module.css"

const Paginado = ({ productos, productsPerPage, fnPaginado }) => {
  const numberOfPages = [];
  for (let i = 1; i <= Math.ceil(productos / productsPerPage); i++) {
    numberOfPages.push(i);
  }

  return (
    <>
      <div className="paginadoContainer">
        <div className="paginadoBotonContainer">
          {
            numberOfPages.map(num => {
              return (
              <button className="paginadoBoton" key={num} onClick={()=> fnPaginado(num) }>{num}</button>
            )})
          }
        </div>
      </div>
    </>
  );
};

export default Paginado
