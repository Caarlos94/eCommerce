import React from 'react';
import s from './Favorites.module.css';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteProduct from './FavoriteProduct';
import { removeFromFavorite } from '../../redux/actions/actions';
import Navbar2 from '../navbar/navBar2';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeFromFavorite(id));
  };

  console.log(favorites);

  return (
    <div>
      <Navbar2 />
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
