import React from 'react';
import style from './filtros.module.css';
// import { filtrarXgenero , filtrarXcreacion } from '../../../redux/actions/actions.js'

const Filtros = () => {
  const fn = (el) => {
    if (el.target.value === 'color') return;
    else {
    }
  };

  const fn2 = (el) => {
    if (el.target.value === 'juegos') return;
    else {
    }
  };

  const fn3 = (el) => {
    if (el.target.value === 'precio') return;
    else {
    }
  };

  const fn4 = (el) => {
    if (el.target.value === 'talla') return;
    else {
    }
  };

  return (
    <div className={style.div}>
      <select onChange={(e) => fn(e)} className={style.select}>
        <option value="color">color</option>
        <option value="negro">negro</option>
        <option value="blanco">blanco</option>
        <option value="rojo">rojo</option>
        <option value="azul">azul</option>
        <option value="verde">verde</option>
      </select>

      <select onChange={(e) => fn2(e)} className={style.select}>
        <option value="marca">marca</option>
        <option value="Adidas">Adidas</option>
        <option value="puma">puma</option>
        <option value="humbro">humbro</option>
        <option value="le coq sportif">le coq sportif</option>
      </select>

      <select onChange={(e) => fn3(e)} className={style.select}>
        <option value="precio">precio</option>
        <option value="Adidas">10 a 15 usd$</option>
        <option value="puma">15 a 20 usd$</option>
        <option value="humbro">20 a 25 usd$</option>
        <option value="le coq sportif">25 a 30 usd$</option>
      </select>

      <select onChange={(e) => fn4(e)} className={style.select}>
        <option value="talla">talla</option>
        <option value="L">L</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="xl">xl</option>
        <option value="xxl">xxl</option>
      </select>
    </div>
  );
};

export default Filtros;
