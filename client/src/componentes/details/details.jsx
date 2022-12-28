import React from 'react';
import s from './details.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetails,
  limpiarState,
  addToCart,
  addToFavorite,
} from '../../redux/actions/actions.js';
import { Link, NavLink, useParams } from 'react-router-dom';
import SearchBar from '../navbar/searchBar/searchBar';
import back from '../../img/back.png';
import heart from '../../img/heart-regular.svg';
import usuario from '../../img/user.svg';
import shopping from '../../img/shopping.png';
import QASection from '../customersQA/QASection'; // La sección de QA del producto. Debe ir en este componente. Falta posicionarlo bien, dar estilos etc
import { useAuth0 } from '@auth0/auth0-react';
import answers from '../../img/answ.png'
import Navbar from '../navbar/navbar';

const Details = () => {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.cart)

  let { id } = useParams();

  useEffect(() => {
    dispatch(limpiarState());
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const details = useSelector((state) => state.details);
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0()


  const handleSubmit = (id) => {
    dispatch(addToCart(id));
    console.log(details);
    alert("Añadido con éxito al carrito");
  };

  const handleAdd = (id) => {
    dispatch(addToFavorite(id));
  };

  return (
    <div>
      <Navbar />
      {/* <div className={s.detailHeader}>
        <div className={s.black}></div>
        <div className={s.white}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <div className={s.backHome}>
              <img src={back} alt=""></img>
              Inicio
            </div>
          </NavLink>
          <div className={s.search}>
            <SearchBar />
          </div>
          <div className={s.btns}>
            {isAuthenticated ? (
              <div className={s.profileMenu}>
                <details>
                  <summary>Hola {user.nickname}!</summary>
                  <div className={s.desplegable}>
                    <div>
                      <Link to="/profile" style={{ textDecoration: 'none' }} className={s.button}>Perfil</Link>
                    </div>
                    <div>
                      <button onClick={() => logout()} className={s.button}>Cerrar sesión</button>
                    </div>
                  </div>
                </details>
              </div>
            ) : (
              <button onClick={() => loginWithRedirect()} className={s.btn}> <img src={usuario} alt=""></img> </button>
            )}
            <div className={s.btn}>
              <img src={heart} alt=""></img>
            </div>

            {carrito.length > 0 ? (
              <NavLink to="/cart" className={s.carro} style={{ textDecoration: 'none' }}>
                <div className={s.btn}>
                  <h6>{carrito.length}</h6>
                  <img src={shopping} alt=""></img>
                </div>
              </NavLink>
            ) : (
              <NavLink to="/cart" className={s.carro} >
                <div className={s.btn}>
                  <img src={shopping} alt=""></img>
                </div>
              </NavLink>
            )}

            <NavLink to="/answers">
              <div className={s.btnQA}>
                <img src={answers} alt=""></img>
              </div>
            </NavLink>

          </div>
        </div> 
      </div>*/}

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
                <button disabled={details[0].stock === 0} onClick={() => handleSubmit(id)}>
                  AÑADIR AL CARRITO
                </button>
                <div className={s.fav} onClick={() => handleAdd(id)}>
                  <img src={heart} alt=""></img>
                </div>
              </div>
            </div>
          </div>
          <div className={s.qyaCont}>
            <QASection productId={id} />
            {/* <AdminQA></AdminQA> */}
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
