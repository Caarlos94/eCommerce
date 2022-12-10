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

  // console.log();

  // console.log(details[0].marca);

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
               <h2>{details[0].precio}</h2>  
                <p>marca: {details[0].marca}</p>  
                <p>colores: {details[0].color}</p>
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
