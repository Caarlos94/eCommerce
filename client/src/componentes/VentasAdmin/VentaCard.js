import React, { useState } from "react";
import classes from "./VentaCard.module.css";
import ProductCard from "./ProductCard";

const VentaCard = ({ data, accessToken }) => {
  const { cliente } = data;
  const [sent, setSent] = useState({
    didClick: false,
    didNotify: data.enviado,
    trackingNumber: "",
    feedback: "",
  });

  const [responseError, setResponseError] = useState({
    error: false,
    msg: "",
  });
  const [trackingError, setTrackingError] = useState({
    error: false,
    msg: "",
  });
  const [didFocus, setDidFocus] = useState(false);

  const handleClick = () => {
    setSent((prevState) => ({ ...prevState, didClick: !prevState.didClick }));
  };

  const handleChange = (e) => {
    setInterval(() => {
      setDidFocus(true);
      e.target.value.length < 8
        ? setTrackingError({
            error: true,
            msg: "El localizador debe tener más de 8 digitos",
          })
        : setTrackingError({
            error: false,
            msg: "",
          });
    }, 1000);

    setSent((prevState) => ({ ...prevState, trackingNumber: e.target.value }));
  };

  const handleSentTrackingNo = (e) => {
    e.preventDefault();
    if (sent.trackingNumber.length < 8) return;
    if (trackingError.error) return;

    setSent((prevState) => ({ ...prevState, didNotify: true }));

    fetch(`http://localhost:3001/compras/adminSales/${data.purchaseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ trackingNumber: sent.trackingNumber }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) return setResponseError({ error: true, msg: data.msg });
        setSent((prevState) => ({
          ...prevState,
          feedback: data,
          trackingNumber: "",
          didClick: false,
        }));
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes["left-side-container"]}>
        <div className={classes["sent-date-container"]}>
          <p>{sent.didNotify ? "Enviado" : "Por enviar"}</p>
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
          <p>Correo: {cliente.email || "null"}</p>
          <p>Teléfono: {cliente.cel || "null"}</p>
          <p>Dirección: {cliente.address || "null"}</p>
          <p>Código postal: {cliente.zipCode || "null"}</p>
        </div>
        <div className={classes["mark-sent-container"]}>
          {!sent.didNotify && !sent.didClick ? (
            <button onClick={handleClick}>Notificar envío</button>
          ) : (
            ""
          )}{" "}
          {sent.didNotify && !sent.didClick ? (
            <button onClick={handleClick}>Modificar localizador</button>
          ) : (
            ""
          )}
          {responseError.error && <p>{responseError.msg}</p>}
          {sent.didClick ? (
            <div>
              <form onSubmit={handleSentTrackingNo}>
                <label htmlFor="trackingNo">Localizador </label>
                <input
                  onChange={handleChange}
                  autoComplete="off"
                  name="trackingNo"
                  type="text"
                  value={sent.trackingNumber}
                ></input>
                <button disabled={trackingError.error || !didFocus} type="form">
                  Enviar
                </button>
              </form>
            </div>
          ) : (
            ""
          )}
          {sent.didNotify ? <p>{sent.feedback}</p> : ""}
          {trackingError.error ? <p>{trackingError.msg}</p> : ""}
        </div>
      </div>
    </div>
  );
};

export default VentaCard;
