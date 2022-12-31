import React, { useState, useEffect } from "react";
import { useValidateUser } from "../../customHooks/validate-user";
import classes from "./VentasAdmin.module.css";
import VentaCard from "./VentaCard";

const VentasAdmin = () => {
  const [, /*isAuthenticated*/ isAdmin, accessToken] = useValidateUser();
  const [error, setError] = useState({});
  const [data, setData] = useState();
  const [filters, setFilters] = useState({ order: "DESC", show: "all" });

  const handleFilters = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    accessToken &&
      fetch(
        `http://localhost:3001/compras/adminSales?order=${filters.order}&enviado=${filters.show}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.error) return setError(response);
          setData(response);
        });
  }, [accessToken, filters]);
  return (
    <>
      {error.error && <p>{error.msg}</p>}
      {isAdmin ? (
        <div>
          <h1>Registro de ventas</h1>

          <div className={classes["filters-container"]}>
            <div className={classes.order}>
              <label htmlFor="order">Orden: </label>
              <select name="order" onChange={handleFilters}>
                <option value="DESC">Más recientes</option>
                <option value="ASC">Más antiguos</option>
              </select>
            </div>
            <div className={classes.sent}>
              <label htmlFor="show">Mostrar: </label>
              <select name="show" onChange={handleFilters}>
                <option value={"null"}>Todas</option>
                <option value={true}>Enviadas</option>
                <option value={false}>Por enviar</option>
              </select>
            </div>
          </div>

          {data && !data.error && data.length
            ? data.map((el) => (
                <VentaCard
                  accessToken={accessToken}
                  key={el.purchaseId}
                  data={el}
                />
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default VentasAdmin;
