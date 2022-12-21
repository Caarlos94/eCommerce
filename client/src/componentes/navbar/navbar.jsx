import React, { useEffect } from 'react';
import SearchBar from './searchBar/searchBar.jsx';
import Filtros from './filtros/filtros.jsx';
import style from './navbar.module.css';
import { Link, NavLink } from 'react-router-dom';
import heart from '../../img/heart-regular.svg';
import usuario from '../../img/user.svg';
import shopping from '../../img/shopping.png';
import { useDispatch } from 'react-redux';
import { getProducts, importUser } from '../../redux/actions/actions.js';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ setPages }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0()
  
  isAuthenticated && dispatch(importUser(user))

  return (
    <div className={style.div}>
      <div className={style.black}></div>
      <div className={style.white}>
        <div className={style.publicar}>
          <NavLink to="/product">
            <button>Publicar un producto!</button>
          </NavLink>
        </div>
        <div className={style.filtros}>
          <Filtros setPages={setPages} />
        </div>
        <div className={style.searchBar}>
          <SearchBar setPages={setPages} />
        </div>

        <div className={style.btns}>
          {isAuthenticated ? (
            <div className={style.profileMenu}>
              <details>
                <summary>Hola {user.given_name}!</summary>
                <div className={style.desplegable}>
                  <div>
                    <Link to="/profile" style={{ textDecoration: 'none' }} className={style.button}>Perfil</Link>
                  </div>
                  <div>
                    <button onClick={() => logout()} className={style.button}>Cerrar sesión</button>
                  </div>
                </div>
              </details>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()} className={style.btn}> <img src={usuario} alt=""></img> </button>
          )}
          <div className={style.btn}>
            <img src={heart} alt=""></img>
          </div>
          <NavLink to="/cart" className={style.carro}>
            <div className={style.btn}>
              <img src={shopping} alt=""></img>
            </div>
          </NavLink>
          {isAuthenticated ? (
            <div>
              <button onClick={() => logout()} className={style.btn}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div>
              <button onClick={() => loginWithRedirect()} className={style.btn}>
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Navbar;
