import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./HistorialUsuario.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar2 from "../navbar/navBar2";

import Compras from "./Compras";
const HistorialUsuario = () => {
  const [infoDeHistorial, setinfoDeHistorial] = useState([]);
  const { user } = useAuth0();
  const [clienteId, setClienteId] = useState("");

  useEffect(async () => {
    const fetchUserId = async () => {
      axios
        .post("http://localhost:3001/compras/obtenerId", {
          User: user.nickname,
        })
        .then((data) => {
          setClienteId(data.data);
          return data.data;
        });
    };

    fetchUserId();
  }, [user.nickname]);

  useEffect(() => {
    if (!clienteId) return;

    const fetchInfo = async (userId) => {
      const respuesta = await axios.post(
        "http://localhost:3001/compras/historial",
        {
          clienteId: userId,
        }
      );
      // console.log(respuesta.data);
      setinfoDeHistorial(respuesta.data);
    };
    fetchInfo(clienteId);
  }, [clienteId]);

  return (
    <div>
      <Navbar2></Navbar2>

      <div className={style.divPadre}>
        <h2>historial de compras</h2>

        {infoDeHistorial.map((elem) => {
          ///mapeamos toda la info que tenemos en el estado local infoDeHistorial

          return (
            <Compras
              nombre={elem.nombre}
              URL={elem.URL}
              marca={elem.marca}
              fecha={elem.fecha}
              precio={elem.precio}
              talla={elem.talla}
              id={elem.id}
              enviado={elem.estado}
              key={elem.id}
              clienteId={clienteId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HistorialUsuario;
