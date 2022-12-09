import React from 'react';
import s from './details.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../redux/actions/actions.js';
import Navbar from '../navbar/navbar';
import { NavLink, useParams } from 'react-router-dom';

const Details = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <NavLink to="/">
        <button>Volver al inicio</button>
      </NavLink>
      <Navbar />
      {details.length ? (
        <div className={s.detailCont}>
          <div className={s.imgCont}>
            <img src={details[0].URL} alt="img"></img>
          </div>
          <div className={s.textCont}>
            <div className={s.productDesc}>
              <h2>{details[0].nombre}</h2>
              <p>{details[0].precio}</p>
              <p>
                {details[0].categoria}, {details[0].color}
              </p>
              <p>Talla: {details[0].talla}</p>
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
