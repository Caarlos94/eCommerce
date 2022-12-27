import React from 'react';
import s from './details.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetails,
  limpiarState,
  addToCart,
} from '../../redux/actions/actions.js';
import { NavLink, useParams, Link } from 'react-router-dom';
import SearchBar from '../navbar/searchBar/searchBar';
import back from '../../img/back.png';
import heart from '../../img/heart-regular.svg';
import usuario from '../../img/user.svg';
import shopping from '../../img/shopping.png';
import QASection from '../customersQA/QASection'; // La sección de QA del producto. Debe ir en este componente. Falta posicionarlo bien, dar estilos etc
import AdminQA from '../adminQA/AdminQA';
import { useAuth0 } from "@auth0/auth0-react";

const Details = () => {
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(limpiarState());
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const details = useSelector((state) => state.details);
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0()

  const handleSubmit = (id) => {
    dispatch(addToCart(id));
    // console.log(details);
    alert('Añadido con éxito al carrito');
  };

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
            {isAuthenticated ? (
            <div>
              <details>
                <summary>Hola {user.nickname}!</summary>
                <div>
                  <div>
                    <Link to="/profile" style={{ textDecoration: 'none' }}>Perfil</Link>
                  </div>
                  <div>
                    <button onClick={() => logout()}>Cerrar sesión</button>
                  </div>
                </div>
              </details>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()} className={s.btn}> <img src={usuario}  alt=""></img> </button>
          )}
            </div>
            <div className={s.btn}>
              <img src={heart} alt=""></img>
            </div>
            <NavLink to="/cart" className={s.carro}>
              <div className={s.btn}>
                <img src={shopping} alt=""></img>
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      {/* <Navbar /> */}
      {details.length ? (
        <div className={s['parent-container']}>
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
                <h5>Stock: {details[0].stock}</h5>
              </div>
              <div className={s.botones}>
                <button onClick={() => handleSubmit(id)}>
                  AÑADIR AL CARRITO
                </button>
                <div className={s.fav}>
                  <img src={heart} alt=""></img>
                </div>
              </div>
            </div>
          </div>
          <QASection productId={id} />
          <AdminQA></AdminQA>
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
