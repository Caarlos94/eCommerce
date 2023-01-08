import React from 'react';
import s from './Favorites.module.css';
<<<<<<< HEAD
import { useSelector, useDispatch } from 'react-redux';
import FavoriteProduct from './FavoriteProduct';
import { removeFromFavorite } from '../../redux/actions/actions';
import Navbar2 from '../navbar/navBar2';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
=======
// import { useSelector, useDispatch } from "react-redux";
import FavoriteProduct from './FavoriteProduct';
// import { removeFromFavorite } from "../../redux/actions/actions";
import Navbar2 from "../navbar/navBar2";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
>>>>>>> development

const Favorites = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [clienteId, setClienteId] = useState('');

<<<<<<< HEAD
  const handleDelete = (clienteId, productoId) => {
    fetch('http://localhost:3001/favoritos/', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: { clienteId: clienteId, productoId: productoId },
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  };

=======
>>>>>>> development
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/favoritos/${user.email}`)
        .then((data) => data.json())
        .then((data) => {
          setFavoritos(data.productos);
          setClienteId(data.clienteId);
        });
    }
  }, [user]);

  return (
    <div>
      <Navbar2 />
      <div className={s.favoriteCont}>
        <h1>Favoritos</h1>
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
<<<<<<< HEAD
              handleDelete={() => handleDelete(clienteId, c.id)}
=======
              clienteId={clienteId}
            // handleDelete={() => handleDelete(clienteId, c.id)}
>>>>>>> development
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
