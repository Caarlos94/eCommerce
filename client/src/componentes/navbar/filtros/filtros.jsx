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
  
  const returnDefault = () => {
    document.getElementById('fn').value = 'Categorias'
    document.getElementById('fn2').value = 'Marca'
    document.getElementById('fn3').value = 'Precio'
    document.getElementById('fn4').value = 'Talla'
  }


  const handlerClickAllProds = () => {
    dispatch(getProducts2())
    returnDefault()
  }



  return (
    <div className={style.div}>
        <select onChange={(e) => fn(e)} className={style.select} id='fn'>
          <option className='option1' hidden >Categorias</option>
          <option value="todas">Todas</option>
          <option value="Camperas">Camperas</option>
          <option value="Pantalones">Pantalones</option>
          <option value="Remeras">Remeras</option>
          <option value="Shorts">Shorts</option>
          <option value="Zapatillas">Zapatillas</option>
        </select>


        <select onChange={(e) => fn2(e)} className={style.select} id='fn2'>
          <option hidden>Marca</option>
          <option value="todas">Todas</option>
          <option value="Adidas">Adidas</option>
          <option value="Nike">Nike</option>
          <option value="Puma">Puma</option>
          <option value="Umbro">Umbro</option>
          <option value="Le Coq Sportif">Le Coq Sportif</option>
        </select>

        <select onChange={(e) => fn3(e)} className={style.select} id='fn3'>
          <option className='option3' hidden>Precio</option>
          <option value={[0, 0]}>Todos</option>
          <option value={[10, 15]}>10 a 15 usd$</option>
          <option value={[15, 20]}>15 a 20 usd$</option>
          <option value={[20, 25]}>20 a 25 usd$</option>
          <option value={[25, 30]}>25 a 30 usd$</option>
        </select>

        <select onChange={(e) => fn4(e)} className={style.select} id='fn4'>
          <option className='option4' hidden>Talla</option>
          <option value="todas">Todas</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
        
      <div className={style.clear}>
        <NavLink to="/">
          <button onClick={(e) => handlerClickAllProds(e)}>
            Todos los Productos
          </button>
        </NavLink>
      </div>

      {/* <button onClick={(e) => handlerError(e)}>
        Resolver errores de filtros
      </button> */}
    </div>
  );
};

export default Filtros;
