import React, { useEffect, useState } from 'react';
import SearchBar from './searchBar/searchBar.jsx';
import style from './navBar2.module.css';
import './navBar2.css';
import { Link, NavLink } from 'react-router-dom';
import heart from '../../img/heart-regular.svg';
import usuario from '../../img/user.svg';
import back from '../../img/back.png';
import shopping from '../../img/shopping.png';
import answers from '../../img/answ.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFavorites,
  getProducts,
  importUser,
} from '../../redux/actions/actions.js';
import { useAuth0 } from '@auth0/auth0-react';
import jwt_decode from 'jwt-decode';

const Navbar2 = ({ setPages }) => {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.cart);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const {
    user,
    loginWithRedirect,
    isAuthenticated,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  let email;
  user && (email = user.email);

  useEffect(() => {
    dispatch(getProducts);

    const checkForAdminRole = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        let decoded = jwt_decode(accessToken);

        if (decoded.permissions.includes('read:admin')) {
          // verificación principalmente estética. No brinda seguridad.
          setIsAdmin(true);
        }
        if (decoded.permissions.includes('read:users')) {
          setIsSuperAdmin(true);
        }
      }
    };
    checkForAdminRole();
    dispatch(getFavorites(email));
  }, [isAuthenticated, getAccessTokenSilently, dispatch, email]);

  const favoritos = useSelector((state) => state.favorites);

  const [isOpen, SetOpen] = useState(false);
  isAuthenticated && dispatch(importUser(user));

  return (
    <div className={style.div}>
      <div className={style.black}>
        <div className={style.Hamburguesa} onClick={() => SetOpen(!isOpen)}>
          <span className="span"></span>
          <span className="span"></span>
          <span className="span"></span>
        </div>
      </div>

      <div className={`white2 ${isOpen && 'open'}`}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <div className={style.backHome}>
            <img src={back} alt=""></img>
            Inicio
          </div>
        </NavLink>

        <div className={style.searchBar}>
          <SearchBar setPages={setPages} />
        </div>

        <div className={style.btns}>
          {isAuthenticated ? (
            <div className={style.profileMenu}>
              <details>
                <summary>Hola {user.nickname}!</summary>
                <div className={style.desplegable}>
                  <div>
                    <Link
                      to="/profile"
                      style={{ textDecoration: 'none' }}
                      className={style.button}
                    >
                      Perfil
                    </Link>
                  </div>
                  {!isAdmin && ( 
                    <div>
                      <Link to="/historial" style={{ textDecoration: "none" }} className={style.button}>
                        Historial
                      </Link>
                    </div> )
                  } 
                  <div>
                    <button onClick={() => logout()} className={style.button}>
                      Cerrar sesión
                    </button>
                  </div>
                  {/* <div className={style.historialC}>
                    <NavLink to="/historial" style={{ textDecoration: 'none' }}>
                      <button>Historial de Compras</button>
                    </NavLink>
                  </div> */}
                  {isAdmin ? (
                    <div className={style.adminn}>
                      <div className={style.historialV}>
                        <NavLink to="/sales" style={{ textDecoration: 'none' }}>
                          <button>Historial de Ventas</button>
                        </NavLink>
                      </div>
                      <div className={style.publicar}>
                        <NavLink
                          to="/product"
                          style={{ textDecoration: 'none' }}
                        >
                          <button>Publicar un Producto</button>
                        </NavLink>
                      </div>
                    </div>
                  ) : (
                    <div className={style.historialC}>
                      <NavLink
                        to="/historial"
                        style={{ textDecoration: 'none' }}
                      >
                        <button>Historial de Compras</button>
                      </NavLink>
                    </div>
                  )}
                </div>
              </details>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()} className={style.btn}>
              <img src={usuario} alt=""></img>
            </button>
          )}

          {isAdmin ? (
            <div className={style.admin}>
              {/* <div className={style.publicar}>
                <NavLink to="/product" style={{ textDecoration: 'none' }}>
                  <button>Publicar un Producto</button>
                </NavLink>
              </div> */}
              <div className={style.qa}>
                <NavLink to="/answers">
                  <div className={style.btnQA}>
                    <img src={answers} alt=""></img>
                  </div>
                </NavLink>
              </div>
              {/* <div className={style.publicar}>
                <NavLink to="/sales" style={{ textDecoration: "none" }}>
                  <button>Historial de Ventas</button>
                </NavLink>
              </div> */}
              {isSuperAdmin ? (
                <div className={style.historial}>
                  <NavLink to="/superAdmin" style={{ textDecoration: 'none' }}>
                    <button>admins</button>
                  </NavLink>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            <>
              {carrito.length > 0 ? (
                <NavLink
                  to="/cart"
                  className={style.carro}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={style.btn}>
                    <h6>{carrito.length}</h6>
                    <img src={shopping} alt=""></img>
                  </div>
                </NavLink>
              ) : (
                <NavLink to="/cart" className={style.carro}>
                  <div className={style.btn}>
                    <img src={shopping} alt=""></img>
                  </div>
                </NavLink>
              )}

              {user ? (
                <>
                  <NavLink to={`/favoritos/${user.email}`}>
                    <div className={style.btn}>
                      {favoritos.length > 0 && <h6>{favoritos.length}</h6>}
                      <img src={heart} alt=""></img>
                    </div>
                  </NavLink>

                  {/* <div className={style.historial}>
                    <NavLink to="/historial" style={{ textDecoration: "none" }}>
                      <button>Historial de Compras</button>
                    </NavLink>
                  </div> */}
                </>
              ) : (
                <NavLink to="/">
                  <div className={style.btn}>
                    <img src={heart} alt=""></img>
                  </div>
                </NavLink>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar2;