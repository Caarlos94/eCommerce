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
