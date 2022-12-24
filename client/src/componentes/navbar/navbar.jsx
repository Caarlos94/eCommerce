import React, { useEffect, useState } from 'react';
import SearchBar from './searchBar/searchBar.jsx';
import Filtros from './filtros/filtros.jsx';
import style from './navbar.module.css';
import './navbarr.css';
import { Link, NavLink } from 'react-router-dom';
import heart from '../../img/heart-regular.svg';
import usuario from '../../img/user.svg';
import shopping from '../../img/shopping.png';
import { useDispatch } from 'react-redux';
import { getProducts, importUser } from '../../redux/actions/actions.js';
import { useAuth0 } from '@auth0/auth0-react';
// import Burger from '../navbar/BurgerMenu/Burger.jsx';

const Navbar = ({ setPages }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
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
      <div className={`white ${isOpen && 'open'}`}>
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
                  <div>
                    <button onClick={() => logout()} className={style.button}>
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </details>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()} className={style.btn}>
              {' '}
              <img src={usuario} alt=""></img>{' '}
            </button>
          )}
          <NavLink to="/favorites">
            <div className={style.btn}>
              <img src={heart} alt=""></img>
            </div>
          </NavLink>
          <NavLink to="/cart" className={style.carro}>
            <div className={style.btn}>
              <img src={shopping} alt=""></img>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
