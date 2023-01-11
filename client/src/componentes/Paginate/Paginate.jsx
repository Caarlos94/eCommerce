import React from "react";
import style from "./Paginate.module.css";

const Paginado = ({
  productsPerPage,
  totalProducts,
  paginate,
  paginatePrev,
  paginateNext,
  currentPage,
}) => {
  const numberOfPages = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    numberOfPages.push(i);
  }

  const handlePrev = () => {
    paginatePrev(currentPage - 1);
  };

  const handleNext = () => {
    paginateNext(currentPage + 1);
  };

  return (
    <>
      <div className={style.paginadoContainer}>
        <div /* className={style.paginadoBotonContainer} */>
          <button onClick={handlePrev}
          disabled={currentPage === 1} className={style.numberList}>
            Anterior
          </button>
          {numberOfPages.map((num) => {
            return (
              <button
                className={currentPage !== num ? style.numberList : style.current}
                key={num}
                onClick={() => paginate(num)}
              >
                {num}
              </button>
            );
          })}
          <button
            onClick={handleNext}
            disabled={currentPage === numberOfPages.length}
            className={style.numberList}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default Paginado;
