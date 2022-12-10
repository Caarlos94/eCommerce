import React from 'react';
import style from './filtros.module.css';
import { useDispatch } from 'react-redux';

import {
  searchXmarca,
  searchXprecio,
  searchXtalla,
  searchXcategoria
} from '../../../redux/actions/actions.js';

const Filtros = () => {
  const dispatch = useDispatch();


  const fn= (el) => {
    dispatch(searchXcategoria(el.target.value));
};
  const fn2 = (el) => {
      dispatch(searchXmarca(el.target.value));
  };

  const fn3 = (el) => {
      dispatch(searchXprecio(el.target.value));
  };

  const fn4 = (el) => {
      dispatch(searchXtalla(el.target.value));
    
  };
    
        


  
  return (
    <div className={style.div}>

     <select onChange={(e) => fn(e)} className={style.select}>
        <option hidden>categorias</option>
        <option value="todas">todas</option>
        <option value="Camperas">Camperas</option>
        <option value="Pantalones">Pantalones</option>
        <option value="Remeras">Remeras</option>
        <option value="Shorts">Shorts</option>
        <option value="Zapatillas">Zapatillas</option>
      
      </select>


      <select onChange={(e) => fn2(e)} className={style.select}>
        <option hidden>marca</option>
        <option value="todas">todas</option>
        <option value="Adidas">Adidas</option>
        <option value="Nike">Nike</option>
        <option value="puma">Puma</option>
        <option value="humbro">Umbro</option>
        <option value="le coq sportif">Le coq sportif</option>
      </select>

      <select onChange={(e) => fn3(e)} className={style.select}>
        <option hidden>precio</option>
        <option value={[0, 0]}>Todos</option>
        <option value={[10, 15]}>10 a 15 usd$</option>
        <option value={[15, 20]}>15 a 20 usd$</option>
        <option value={[20, 25]}>20 a 25 usd$</option>
        <option value={[25, 30]}>25 a 30 usd$</option>
      </select>

      <select onChange={(e) => fn4(e)} className={style.select}>
        <option hidden>talla</option>
        <option value="todas">Todas</option>
        <option value="L">L</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="xl">XL</option>
        <option value="xxl">XXL</option>
      </select>
    </div>
  );;
}
export default Filtros;
