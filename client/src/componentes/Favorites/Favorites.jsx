import React from 'react';
import s from './Favorites.module.css';
// import { useSelector, useDispatch } from "react-redux";
import FavoriteProduct from './FavoriteProduct';
// import { removeFromFavorite } from "../../redux/actions/actions";
import Navbar2 from "../navbar/navBar2";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [clienteId, setClienteId] = useState('');

  const { user } = useAuth0();

  useEffect(() => {
    if (user && user.hasOwnProperty("email")) {
      fetch(`http://localhost:3001/favoritos/${user.email}`)
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setFavoritos(data.productos);
          setClienteId(data.clienteId);
        });
    }
  }, [user]);

  return (
    <div>
      <Navbar2 />
      <div className={s.favoriteCont}>
        <p className={s.titulo}>TUS FAVORITOS</p>
        <div className={s.favgrid}>
        {favoritos ? (
          favoritos.map((c) => (
            <FavoriteProduct
              key={c.id}
              id={c.id}
              nombre={c.nombre}
              talla={c.talla}
              precio={c.precio}
              cantidad={c.cantidad}
              URL={c.URL}
              clienteId={clienteId}
            // handleDelete={() => handleDelete(clienteId, c.id)}
            />
          ))
        ) : (
          <p>No tienes productos en tu lista de favoritos</p>
        )}
        </div>
        
      </div>
    </div>
  );
};

export default Favorites;