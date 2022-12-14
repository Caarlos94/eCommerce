import React from 'react';
import s from './details.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, limpiarState } from '../../redux/actions/actions.js';
/* import Navbar from '../navbar/navbar'; */
import { NavLink, useParams } from 'react-router-dom';
import SearchBar from '../navbar/searchBar/searchBar';
import back from '../../img/back.png';
import heart from '../../img/heart-regular.svg';
import user from '../../img/user.svg';
import shopping from '../../img/shopping.png';

const Details = () => {
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(limpiarState());
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const details = useSelector((state) => state.details);

  return (
    <div>
      <div className={s.detailHeader}>
        <div className={s.black}></div>
        <div className={s.white}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <div className={s.backHome}>
              <img src={back} alt=""></img>
              Atrás
            </div>
          </NavLink>
          <div className={s.search}>
            <SearchBar />
          </div>
          <div className={s.btns}>
            <div className={s.btn}>
              <img src={user} alt=""></img>
            </div>
            <div className={s.btn}>
              <img src={heart} alt=""></img>
            </div>
            <div className={s.btn}>
              <img src={shopping} alt=""></img>
            </div>
          </div>
        </div>
      </div>

      {/* <Navbar /> */}
      {details.length ? (
        <div className={s.detailCont}>
          <div className={s.imgCont}>
            <div className={s.img11}>
              {/* <img src={details[0].URL} alt="img"></img> */}
              <div
                className={s.img111}
                style={{ backgroundImage: `url(${details[0].URL})` }}
              ></div>
            </div>
          </div>
          <div className={s.textCont}>
            <div className={s.productDesc}>
              <h2>{details[0].nombre.toUpperCase()}</h2>
              <h3>${details[0].precio} U$D</h3>
              <h5>Marca: {details[0].marca}</h5>
              <h5>Color: {details[0].color}</h5>
              <h5>Talla: {details[0].talla.toUpperCase()}</h5>
              <h6>Stock: {details[0].stock}</h6>
            </div>
            <div className={s.botones}>
              <button>AÑADIR AL CARRITO</button>
              <div className={s.fav}>
                <img src={heart} alt=""></img>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={s.spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Details;
