import React, { useEffect } from 'react';
import SearchBar from './searchBar/searchBar.jsx';
import Filtros from './filtros/filtros.jsx';
import style from './navbar.module.css';
import { NavLink } from 'react-router-dom';
import heart from '../../img/heart-regular.svg';
import user from '../../img/user.svg';
import shopping from '../../img/shopping.png';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/actions.js';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const Navbar = ({ setPages }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);


 const Manejador = (e) => {
    if(e.target.value === "Profile"){
      
    }
    if(e.target.value === "Exit"){
      logout()
    }
  }

  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

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

          {console.log(isAuthenticated)}

          {/* <details>
            <summary>Usuario</summary>
            <Link to = "/profile"> Profile</Link>
            <button onClick={() => logout()}></button>
            </details> */}

          {
            isAuthenticated ? (
              // <select onChange={(e)=> Manejador(e)}>
              //   <option hidden>Usuario</option> 
              //   <option value="Profile"> Profile </option> 
              //   <option value="Exit">Salir</option>
              // </select>
              <details>
              <summary>Usuario</summary>
              <div>
                <Link to = "/profile"> Profile</Link>
              </div>
              <button onClick={() => logout()}>Salir</button>
              </details>
              ) : (
              <button onClick={() => loginWithRedirect()} className={style.btn}> <img src={user} alt=""></img> </button>
            )
          }

          {/* <div className={style.btn}>
            <img src={heart} alt=""></img>
          </div>
          <div className={style.btn}>
            <img src={shopping} alt=""></img>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
