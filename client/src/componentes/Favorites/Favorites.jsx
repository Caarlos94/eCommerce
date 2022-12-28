import React from 'react';
import s from './Favorites.module.css';
import SearchBar from '../navbar/searchBar/searchBar';
import back from '../../img/back.png';
import heart from '../../img/heart-regular.svg';
import user from '../../img/user.svg';
import shopping from '../../img/shopping.png';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteProduct from './FavoriteProduct';
import { removeFromFavorite } from '../../redux/actions/actions';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeFromFavorite(id));
  };

  return (
    <div>
      <div className={s.favoriteHeader}>
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
            <NavLink to="/favorites">
              <div className={s.btn}>
                <img src={heart} alt=""></img>
              </div>
            </NavLink>
            <NavLink to="/cart" className={s.carro}>
              <div className={s.btn}>
                <img src={shopping} alt=""></img>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className={s.favoriteCont}>
        <h1>Favoritos</h1>
        {favorites ? (
          favorites.map((c) => (
            <FavoriteProduct
              key={c.id}
              id={c.id}
              nombre={c.nombre}
              talla={c.talla}
              precio={c.precio}
              cantidad={c.cantidad}
              URL={c.URL}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No tienes productos en tu lista de favoritos</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
