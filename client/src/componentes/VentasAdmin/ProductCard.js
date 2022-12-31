import React from "react";
import classes from "./ProductCard.module.css";

const ProductCard = ({ data }) => {
  return (
    <div className={classes["product-card"]}>
      <div className={classes["img-container"]}>
        <img src={data.url} alt={data.name}></img>
      </div>
      <div className={classes["product-info-container"]}>
        <p>{data.nombre}</p>
        <p>Talla: {data.talla}</p>
        <p>Color: {data.color}</p>
        <p>Precio: ${data.precio}</p>
        <p>Cantidad: {data.cantidad}</p>
      </div>
    </div>
  );
};

export default ProductCard;
