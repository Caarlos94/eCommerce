import React, { useState } from 'react';
import style from './FormCompra.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar2 from '../navbar/navBar2';

export default function FormCompra({ handle }) {
  const { user } = useAuth0();
  console.log(user.email);

  const [input, setInput] = useState({
    ciudad: "",
    cp: "",
    direc: "",
    cel: "",
    nombre: "",
    apellido: "",
    DNI: "",
  });

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    setInput({
      ciudad: "",
      cp: "",
      direc: "",
      cel: "",
      nombre: "",
      apellido: "",
      DNI: "",
    });
  };

  return (
    <div>
      <Navbar2></Navbar2>
      <div className={style.cont}>
        <h1>Formulario de Envío</h1>

        <div className={style.forms}>
          <form onSubmit={(e) => handlerSubmit(e)}>
            <div className={style.inputI}>
              <label>Nombre: </label>
              <input
                type="string"
                value={input.nombre}
                name="nombre"
                onChange={(e) => handlerChange(e)}
              ></input>
            </div>

            <div className={style.inputI}>
              <label>Apellido: </label>
              <input
                type="string"
                value={input.apellido}
                name="apellido"
                onChange={(e) => handlerChange(e)}
              ></input>
            </div>

            <div className={style.inputI}>
              <label>DNI: </label>
              <input
                type="string"
                value={input.DNI}
                name="DNI"
                onChange={(e) => handlerChange(e)}
              ></input>
            </div>
            <div className={style.inputI}>
              <label>Ciudad: </label>
              <input
                type="text"
                value={input.ciudad}
                name="ciudad"
                onChange={(e) => handlerChange(e)}
              ></input>
            </div>

            <div className={style.inputI}>
              <label>Código Postal </label>
              <input
                type="number"
                value={input.cp}
                name="cp"
                onChange={(e) => handlerChange(e)}
              ></input>
            </div>

            <div className={style.inputI}>
              <label>Dirección: </label>
              <input
                type="text"
                value={input.direc}
                name="direc"
                onChange={(e) => handlerChange(e)}
              ></input>
            </div>

            <div className={style.inputI}>
              <label>Celular de contacto: </label>
              <input
                type="number"
                value={input.cel}
                name="cel"
                onChange={(e) => handlerChange(e)}
              ></input>
            </div>

            <div className={style.publicar}>
              <button onClick={() => handle(input, user.email)} type="submit">
                Guardar datos para envío e ir a Mercado Pago...
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
