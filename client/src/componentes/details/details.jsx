import React from 'react';
import s from './details.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/actions.js';
import Navbar from '../navbar/navbar';
import { NavLink } from 'react-router-dom';

const Details = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <NavLink to='/'>
        <button>Volver al inicio</button>
      </NavLink>
      <Navbar />
      {products.length ? (
        <div className={s.detailCont}>
          <div className={s.imgCont}>
            <img src={products[0].URL} alt='img'></img>
          </div>
          <div className={s.textCont}>
            <div className={s.productDesc}>
              <h2>{products[0].nombre}</h2>
              <p>{products[0].precio}</p>
              <p>
                {products[0].categoria}, {products[0].color}
              </p>
              <p>Talla: {products[0].talla}</p>
            </div>
            <button>AÑADIR AL CARRITO</button>
          </div>
        </div>
      ) : (
        <p>error</p>
      )}
    </div>
  );
};

export default Details;
