import React from 'react';
import s from './details.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/actions.js';

const Details = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>NavBar</h1>
      {products.length ? (
        <div className={s.detailCont}>
          <div className={s.imgCont}>
            <img src={products[0].URL}></img>
          </div>
          <div className={s.textCont}>
            <div className={s.productDesc}>
              <h2>{products[0].marca}</h2>
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
