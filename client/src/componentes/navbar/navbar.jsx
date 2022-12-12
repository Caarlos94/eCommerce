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

const Navbar = ({ setPages }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

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
          <Filtros />
        </div>
        <div className={style.searchBar}>
          <SearchBar setPages={setPages} />
        </div>
        <div className={style.btns}>
          <div className={style.btn}>
            <img src={user} alt=""></img>
          </div>
          <div className={style.btn}>
            <img src={heart} alt=""></img>
          </div>
          <div className={style.btn}>
            <img src={shopping} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
