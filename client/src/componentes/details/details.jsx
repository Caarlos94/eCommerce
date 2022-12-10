import React from 'react';
import s from './details.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails , limpiarState} from '../../redux/actions/actions.js';
import Navbar from '../navbar/navbar';
import { NavLink, useParams } from 'react-router-dom';

const Details = () => {
  const dispatch = useDispatch();
  
  let { id } = useParams();

  useEffect(() => {
    dispatch(limpiarState())
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const details = useSelector((state) => state.details);

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
              <h3>Precio: {details[0].precio} u$d</h3>
              <h5>Marca: {details[0].marca}</h5>
              <h5>Color: {details[0].color}</h5>
              <h5>Talla: {details[0].talla.toUpperCase()}</h5>
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
