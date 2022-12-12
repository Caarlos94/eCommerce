import React from 'react';
import style from './filtros.module.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  searchXmarca,
  searchXprecio,
  searchXtalla,
  searchXcategoria,
  /* emptyError, */
  getProducts,
  getProducts2,
} from '../../../redux/actions/actions.js';

const Filtros = ({ setPages }) => {
  const dispatch = useDispatch();

  const fn = (el) => {
    dispatch(searchXcategoria(el.target.value));
    setPages(1);
  };
  const fn2 = (el) => {
    dispatch(searchXmarca(el.target.value));
    setPages(1);
  };

  const fn3 = (el) => {
    dispatch(searchXprecio(el.target.value));
    setPages(1);
  };

  const fn4 = (el) => {
    dispatch(searchXtalla(el.target.value));
    setPages(1);
  };

  /*  const handlerError = (e) => {
     dispatch(emptyError());
   }; */

  const handlerClickAllProds = () => {
    dispatch(getProducts2());
  };
  return (
    <div className={style.div}>
      <div className={style.allFilters}>
        <select onChange={(e) => fn(e)} className={style.select}>
          <option hidden>Categorias</option>
          <option value="todas">Todas</option>
          <option value="Camperas">Camperas</option>
          <option value="Pantalones">Pantalones</option>
          <option value="Remeras">Remeras</option>
          <option value="Shorts">Shorts</option>
          <option value="Zapatillas">Zapatillas</option>
        </select>

        <select onChange={(e) => fn2(e)} className={style.select}>
          <option hidden>Marca</option>
          <option value="todas">todas</option>
          <option value="Adidas">Adidas</option>
          <option value="Nike">Nike</option>
          <option value="Puma">Puma</option>
          <option value="Umbro">Umbro</option>
          <option value="Le Coq Sportif">Le Coq Sportif</option>
        </select>

        <select onChange={(e) => fn3(e)} className={style.select}>
          <option hidden>Precio</option>
          <option value={[0, 0]}>Todos</option>
          <option value={[10, 15]}>10 a 15 usd$</option>
          <option value={[15, 20]}>15 a 20 usd$</option>
          <option value={[20, 25]}>20 a 25 usd$</option>
          <option value={[25, 30]}>25 a 30 usd$</option>
        </select>

        <select onChange={(e) => fn4(e)} className={style.select}>
          <option hidden>Talla</option>
          <option value="todas">Todas</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
      <div className={style.clear}>
        <NavLink to="/">
          <button onClick={(e) => handlerClickAllProds(e)}>All Products</button>
        </NavLink>
      </div>

      {/* <button onClick={(e) => handlerError(e)}>
        Resolver errores de filtros
      </button> */}
    </div>
  );
};

export default Filtros;
