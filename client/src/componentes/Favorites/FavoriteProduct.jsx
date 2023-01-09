import React, { useState } from "react";
import s from "./FavoriteProduct.module.css";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { getFavorites } from "../../redux/actions/actions";
import { Toaster, toast } from 'react-hot-toast';

const FavoriteProduct = ({
  nombre,
  talla,
  precio,
  URL,
  id: productoId,
  clienteId,
}) => {
  const [didDelete, setDidDelete] = useState(false);

  const { user } = useAuth0();
  const dispatch = useDispatch();

  const handleDelete = () => {
    fetch(`http://localhost:3001/favoritos/${clienteId}/${productoId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setDidDelete(true);
      });

    toast.error('Producto eliminado de favoritos');
  };

  user && dispatch(getFavorites(user.email));

  return (
    <>
      {!didDelete ? (
        <div className={s.itemm}>
          <div className={s.item}>
            <NavLink
              to={`/details/${productoId}`}
              style={{ textDecoration: 'none' }}
              className={s.itemmm}
            >
              <div
                className={s.itemImg}
                style={{ backgroundImage: `url(${URL})` }}
              ></div>
            </NavLink>
            <div className={s.info}>
              <h2>{nombre}</h2>
              <p>{talla}</p>
              <p>${precio}</p>
            </div>
            <button onClick={handleDelete}>X</button>
          </div>
          <Toaster
            toastOptions={{
              // Define default options
              className: '',
              duration: 3000,
              style: {
                background: '#fff',
                color: '#000',
              },
            }}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default FavoriteProduct;
