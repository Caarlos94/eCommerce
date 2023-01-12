import React, { useState } from "react";
import s from "./FavoriteProduct.module.css";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { getFavorites } from "../../redux/actions/actions";

const FavoriteProduct = ({
  nombre,
  talla,
  precio,
  URL,
  stock,
  id: productoId,
  clienteId,
}) => {
  const [didDelete, setDidDelete] = useState(false);

  const { user } = useAuth0();
  const dispatch = useDispatch();

  const handleDelete = () => {
    // console.log("hello");
    fetch(`https://suprasports.up.railway.app/favoritos/${clienteId}/${productoId}`, {
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
  };

  user && dispatch(getFavorites(user.email));

  return (
    <>
      {!didDelete ? (
        <div className={s.conteiner}>
          <div className={s.item}>
            <div
              className={s.itemImg}
              style={{ backgroundImage: `url(${URL})` }}
            ></div>

            <div className={s.info}>
              <NavLink to={`/details/${productoId}`} style={{ textDecoration: 'none' }}>
                <p className={s.nombre}>{nombre}</p>
                <p className={s.talle}>Talle: {talla}</p>
              </NavLink>
            </div>

            <div className={s.preciodiv}>
              <p className={s.precioTitle}>Precio</p>
              <p className={s.precio}>${precio}</p>
            </div>

            <div className={s.btnX}>
              <button onClick={handleDelete}>X</button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default FavoriteProduct;