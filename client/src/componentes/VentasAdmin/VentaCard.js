import React from "react";
import classes from "./VentaCard.module.css";
import ProductCard from "./ProductCard";

const VentaCard = ({ data }) => {
  console.log(data);
  const { cliente } = data;

  return (
    <div className={classes.container}>
      <div className={classes["left-side-container"]}>
        <div className={classes["sent-date-container"]}>
          <p>{data.enviado ? "Enviado" : "Por enviar"}</p>
          <p>Fecha de compra: {data.fecha}</p>
        </div>
        <div className={classes["products-container"]}>
          {data.productos.map((producto) => (
            <ProductCard key={producto.productoId} data={producto} />
          ))}
        </div>
      </div>
      <div className={classes["right-side-container"]}>
        <div className={classes["client-container"]}>
          <p>{cliente.nickname}</p>
          <p>{cliente.email || "null"}</p>
          <p>{cliente.cel || "null"}</p>
          <p>{cliente.address || "null"}</p>
          <p>{cliente.zipCode || "null"}</p>
        </div>
        <div className={classes["mark-sent-container"]}>
          {!data.enviado ? <button>Notificar envío</button> : ""}
        </div>
      </div>
    </div>
  );
};

export default VentaCard;
