import React from "react";
import style from "./Paginate.module.css"

const Paginado = ({ productos, productsPerPage, fnPaginado, currentPage }) => {
  const numberOfPages = [];
  for (let i = 1; i <= Math.ceil(productos / productsPerPage); i++) {
    numberOfPages.push(i);
  }

  return (
    <>
      <div className={style.paginadoContainer}>
        <div className={style.paginadoBotonContainer}>
          {
            numberOfPages.map(num => {
              return (
                <button
                  className={currentPage !== num ? style.paginadoBoton : style.paginadoSelect}
                  key={num}
                  onClick={() => fnPaginado(num)}>{num}</button>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Paginado
