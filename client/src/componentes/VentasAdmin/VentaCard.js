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

  /* console.log(data); */

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

    setSent((prevState) => ({ ...prevState, trackingNumber: e.target.value }));
  };

  const handleSentTrackingNo = (e) => {
    e.preventDefault();
    if (sent.trackingNumber.length < 8) return;
    if (trackingError.error) return;

    setSent((prevState) => ({
      ...prevState,
      didNotify: true,
      didClick: false,
    }));

    fetch(`http://localhost:3001/compras/adminSales/${data.purchaseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        trackingNumber: sent.trackingNumber,
        clienteEmail: cliente.email,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) return setResponseError({ error: true, msg: data.msg });
        setSent((prevState) => ({
          ...prevState,
          feedback: data,
          trackingNumber: "",
        }));
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes["left-side-container"]}>
        <div className={classes["sent-date-container"]}>
          <p className={classes["bold-text"]}>
            {sent.didNotify ? "Enviado" : "Por enviar"}
          </p>
          <p>Fecha de compra: {data.fecha}</p>
        </div>
        <div className={classes["products-container"]}>
          {data.productos.map((producto) => (
            <ProductCard
              key={producto.productoId}
              data={producto}
              clienteId={cliente.clienteId} // solo de prueba
              enviado={data.enviado} // solo de prueba
            />
          ))}
        </div>
      </div>
      <div className={classes["right-side-container"]}>
        <div className={classes["client-container"]}>
          <p className={classes["bold-text"]}>
            {cliente.nombre} {cliente.apellido}
          </p>
          <p className={classes["info"]}>Correo: {cliente.email || "null"}</p>
          <p className={classes["info"]}>DNI: {cliente.dni || "null"}</p>

          <p className={classes["info"]}>Teléfono: {cliente.cel || "null"}</p>
          <p className={classes["info"]}>Ciudad: {cliente.ciudad || "null"}</p>
          <p className={classes["info"]}>
            Dirección: {cliente.direccion || "null"}
          </p>
          <p className={classes["info"]}>
            Código postal: {cliente.cp || "null"}
          </p>
        </div>
        <div className={classes["mark-sent-container"]}>
          {!sent.didNotify && !sent.didClick ? (
            <button onClick={handleClick}>Notificar envío</button>
          ) : (
            ""
          )}
          {sent.didNotify && !sent.didClick ? (
            <button onClick={handleClick}>Modificar localizador</button>
          ) : (
            ""
          )}
          {responseError.error && <p>{responseError.msg}</p>}
          {sent.didClick ? (
            <div>
              <form onSubmit={handleSentTrackingNo}>
                <label htmlFor="trackingNo">Localizador: </label>
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
          {sent.didNotify ? (
            <p className={classes.feedback}>{sent.feedback}</p>
          ) : (
            ""
          )}
          {trackingError.error && sent.trackingNumber.length ? (
            <p>{trackingError.msg}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default VentaCard;
