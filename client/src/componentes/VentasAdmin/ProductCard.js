import React from "react";
import classes from "./ProductCard.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ data, clienteId }) => {
  return (
    <div className={classes["product-card"]}>
      <div className={classes["img-container"]}>
        <img src={data.url} alt={data.name}></img>
      </div>
      <div className={classes["product-info-container"]}>
        <p className={classes["bold-text"]}>{data.nombre}</p>
        <p>Talla: {data.talla}</p>
        <p>Color: {data.color}</p>
        <p>Precio: ${data.precio}</p>
        <p>Cantidad: {data.cantidad}</p>
      </div>
      <Link
        to={{
          pathname: "/review-form",
          state: { clienteId, producto: data },
        }}
      >
        <button>TEST add review button</button>
      </Link>
    </div>
  );
};

export default ProductCard;
