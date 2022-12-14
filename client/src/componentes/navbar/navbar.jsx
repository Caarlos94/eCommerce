import React, { useEffect } from 'react';
import SearchBar from './searchBar/searchBar.jsx';
import Filtros from './filtros/filtros.jsx';
/* import Perfil from './Perfil/Perfil.jsx'; */
import style from './navbar.module.css';
import { NavLink } from 'react-router-dom';
import heart from '../../img/heart-regular.svg';
import usuario from '../../img/user.svg';
import shopping from '../../img/shopping.png';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/actions.js';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ setPages }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0()

  const handlerProfile = () => {
    isAuthenticated ? alert(`
        ${user.name}, 
        ${user.email}`
    ) : alert('no ha iniciado sesión todavía')
  }

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
          <button onClick={handlerProfile} className={style.btn}>
            <img src={usuario} alt=""></img>
            {isAuthenticated && console.log(user)}
          </button>

          <div className={style.btn}>
            <img src={heart} alt=""></img>
          </div>
          <div className={style.btn}>
            <img src={shopping} alt=""></img>
          </div>
          {isAuthenticated ?
            <div>
              <button onClick={() => logout()} className={style.btn}>Cerrar Sesión</button>
            </div>
            :
            <div>
              <button onClick={() => loginWithRedirect()} className={style.btn}>Iniciar Sesión</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
