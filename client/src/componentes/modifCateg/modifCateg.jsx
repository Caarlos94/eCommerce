import React, { useEffect, useState } from "react";
import style from "./modifCateg.module.css";
import {
  getCategorys,
  postCategory,
  deleteCategory,
} from "../../redux/actions/actions";
import Navbar2 from "../navbar/navBar2";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const validate = (input, categs) => {
  let errors = {};
  if (input.nombre) {
    if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.nombre)) {
      errors.nombre =
        "Este dato es incorrecto... No se permiten caracteres especiales o números.";
    }
    /* if (
            categs.some((e) => e.toUpperCase() === input.toUpperCase())
          ) {
            errors.nombre = "Este producto ya existe!";
          } */
  }
  return errors;
};

export default function ModifCateg() {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    getAccessTokenSilently().then((data) => setToken(data));
  }, [getAccessTokenSilently]);

  const dispatch = useDispatch();
  const categs = useSelector((state) => state.categorys);

  const [input, setInput] = useState({ nombre: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        categs
      )
    );
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteCategory(e.target.value, token)); //needs token
    console.log(e.target.value + " ELIMINADO");
    dispatch(getCategorys()).then(dispatch(getCategorys()));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input.nombre + " CREADO");
    dispatch(postCategory(input, token)) //needs token
      .then(dispatch(getCategorys()));
    setInput({
      nombre: "",
    });
  };

  return (
    <div>
      <Navbar2 />
      <div className={style.modifCategCont}>
        <h1>Categorías</h1>
        <form onSubmit={(e) => handlerSubmit(e)}>
          <div className={style.inputI}>
            <label>Nombre de la nueva categoría: </label>
            <input
              type="text"
              name="nombre"
              value={input.nombre}
              onChange={(e) => handlerChange(e)}
            ></input>
            {errors.nombre && <p className={style.errors}>{errors.nombre}</p>}
          </div>
          <div className={style.publicar}>
            <button type="submit">Crear Categoría</button>
          </div>
        </form>

        <div className={style.categs}>
          {categs.map(
            (
              categ //mapeo mi estado local con todas las categs
            ) => (
              <div key={categs.indexOf(categ)} className={style.categ}>
                <p>{categ}</p>
                <button
                  value={categ}
                  onClick={(e) => handleDelete(e)}
                  className={style.x}
                >
                  X
                </button>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
