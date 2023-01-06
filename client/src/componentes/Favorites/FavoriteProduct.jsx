import React, { useState } from "react";
import s from "./FavoriteProduct.module.css";
import { NavLink } from "react-router-dom";

const FavoriteProduct = ({
  nombre,
  talla,
  precio,
  URL,
  id: productoId,
  clienteId,
}) => {
  const [didDelete, setDidDelete] = useState(false);
  const handleDelete = () => {
    // console.log("hello");
    fetch(`http://localhost:3001/favoritos/${clienteId}/${productoId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setDidDelete(true);
      });
  };

  return (
    <>
      {!didDelete ? (
        <div className={s.itemm}>
          <div className={s.item}>
            <NavLink
              to={`/details/${productoId}`}
              style={{ textDecoration: "none" }}
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
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FavoriteProduct;