import React from "react";
import style from './filtros.module.css';
import { useDispatch } from 'react-redux';

import { searchXmarca, searchXprecio, searchXtalla, searchXcateg } from '../../../redux/actions/actions.js'

const Filtros = () => {


  const dispatch = useDispatch()


  const fn2 = (el) => {
    if (el.target.value === "marca") return
    else {
      dispatch(searchXmarca(el.target.value))
    }
  }
  const fn3 = (el) => {
    if (el.target.value === "precio") return
    else {
      dispatch(searchXprecio(el.target.value))
    }
  }
  const fn4 = (el) => {
    if (el.target.value === "talla") return
    else {
      dispatch(searchXtalla(el.target.value))
    }
  }
  const handlerSelectCateg = (el) => {
    if (el.target.value === "categoria") return
    else {
      dispatch(searchXcateg(el.target.value))
    }
  }

  return (
    <div className={style.div}>

      <select onChange={e => fn2(e)} className={style.select}>
        <option hidden>Marca</option>
        <option value="todas">Todas</option>
        <option value="Adidas">Adidas</option>
        <option value="Nike">Nike</option>
        <option value="Puma">Puma</option>
        <option value="Umbro">Umbro</option>
        <option value="Le Coq Sportif">Le Coq Sportif</option>
      </select>

      <select onChange={e => fn3(e)} className={style.select}>
        <option hidden>Precio</option>
        <option value={[0, 0]}>Todos</option>
        <option value={[10, 15]}>10 a 15 usd$</option>
        <option value={[15, 20]}>15 a 20 usd$</option>
        <option value={[20, 25]}>20 a 25 usd$</option>
        <option value={[25, 30]}>25 a 30 usd$</option>
      </select>

      <select onChange={e => fn4(e)} className={style.select}>
        <option hidden>Talla</option>
        <option value="todas">Todas</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>

      <select onChange={e => handlerSelectCateg(e)} className={style.select}>
        <option hidden>Categoría</option>
        <option value="todas">Todas</option>
        <option value="Camperas">Camperas</option>
        <option value="Remeras">Remeras</option>
        <option value="Pantalones">Pantalones</option>
        <option value="Shorts">Shorts</option>
        <option value="Zapatillas">Zapatillas</option>
      </select>

    </div>)
}


export default Filtros