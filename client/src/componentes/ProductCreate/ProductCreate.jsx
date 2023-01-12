import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getCategorys,
  getProducts,
  getProducts2,
  postProd,
  /* postCategory */
} from "../../redux/actions/actions";
import style from "./ProductCreate.module.css";
import Navbar2 from "../navbar/navBar2";
import { useAuth0 } from "@auth0/auth0-react";

const validate = (input, prods) => {
  let errors = {};
  if (input.nombre) {
    if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.nombre)) {
      errors.nombre =
        "Este dato es incorrecto... Es obligatorio, no se permiten caracteres especiales o números.";
    }
    if (
      prods.some((e) => e.nombre.toUpperCase() === input.nombre.toUpperCase())
    ) {
      errors.nombre = "Este producto ya existe!";
    }
  }
  if (input.URL[0]) {
    if (!/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(input.URL)) {
      errors.URL =
        'Este dato es obligatorio, solo permite imágenes de tipo .jpg/.png/.jpeg';
    }
  }
  if (input.URL[1]) {
    if (!/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(input.URL)) {
      errors.URL =
        'Este dato es obligatorio, solo permite imágenes de tipo .jpg/.png/.jpeg';
    }
  }
  if (input.URL[2]) {
    if (!/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(input.URL)) {
      errors.URL =
        "Este dato es obligatorio, solo permite imágenes de tipo .jpg/.png/.jpeg";
    }
  }
  if (input.precio) {
    if (input.precio < 1) {
      errors.precio =
        "Este dato es obligatorio, solo permite números mayores a uno.";
    }
  }
  if (input.color) {
    if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.color)) {
      errors.color =
        "Este dato es obligatorio, no se permiten caracteres especiales, números o espacios.";
    }
  }
  if (input.talla) {
    if (
      !(
        input.talla === "S" ||
        input.talla === "M" ||
        input.talla === "L" ||
        input.talla === "XL" ||
        input.talla === "XXL"
      )
    ) {
      errors.talla = "Solo se permiten los talles S-M-L-XL-XXL.";
    }
  }
  if (input.marca) {
    if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.marca)) {
      errors.marca =
        "Este dato es obligatorio, no se permiten caracteres especiales o números.";
    }
  }
  if (input.stock) {
    if (input.stock < 0 || !/^[0-9]+$/.test(input.stock)) {
      errors.stock =
        "Este dato es obligatorio, solo permite números entero y mayor o igual 0.";
    }
  }
  return errors;
};

export default function ProdCreate() {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    getAccessTokenSilently().then((data) => setToken(data));
  }, [getAccessTokenSilently]);

  const dispatch = useDispatch();
  const prods = useSelector((state) => state.products);
  const categs = useSelector((state) => state.categorys);

  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    nombre: '',
    URL: '',
    precio: '',
    color: '',
    talla: '',
    marca: '',
    categoria: '',
    stock: '',
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategorys());
  }, [dispatch]);

  const handlerChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }, prods))
  };

  const handlerSelectCateg = (e) => {
    if (!input.categoria.includes(e.target.value)) {
      setInput({ ...input, categoria: e.target.value })
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postProd(input, token));
    /* dispatch(postCategory(input)); */
    setTimeout(() => dispatch(getProducts2()), 100);
    alert("Producto publicado con éxito! Se te redirigirá al inicio...");
    setInput({
      nombre: '',
      URL: '',
      precio: '',
      color: '',
      talla: '',
      marca: '',
      categoria: '',
      stock: '',
    });
    history.push("/"); //manda al home
  };

  return (
    <div>
      <Navbar2 />
      <div className={style.createCont}>
        <h1>Crear Producto</h1>
        <div className={style.forms}>
          <form onSubmit={(e) => handlerSubmit(e)}>
            <div className={style.inputI}>
              <label>Nombre: </label>
              <input
                type="text"
                name="nombre"
                value={input.nombre}
                onChange={(e) => handlerChange(e)}
              ></input>
              {errors.nombre && <p className={style.errors}>{errors.nombre}</p>}
            </div>

            <div className={style.inputI}>
              <label>Imagen: </label>
              <input
                type="url"
                name="URL"
                onChange={(e) => handlerChange(e)}
              ></input>
              {errors.URL ? (
                <p className={style.errors}>{errors.URL}</p>
              ) : (input.URL) ? (<img src={input.URL} alt="img"></img>) : ('')}
            </div>

            <div className={style.inputI}>
              <label>Precio: </label>
              <input
                type="number"
                value={input.precio}
                name="precio"
                onChange={(e) => handlerChange(e)}
              ></input>
              {errors.precio && <p className={style.errors}>{errors.precio}</p>}
            </div>

            <div className={style.inputI}>
              <label>Color: </label>
              <input
                type="text"
                value={input.color}
                name="color"
                onChange={(e) => handlerChange(e)}
              ></input>

              {errors.color && <p className={style.errors}>{errors.color}</p>}
            </div>

            <div className={style.inputI}>
              <label>Talla: </label>
              <input
                type="text"
                value={input.talla}
                name="talla"
                onChange={(e) => handlerChange(e)}
              ></input>
              {errors.talla && <p className={style.errors}>{errors.talla}</p>}
            </div>

            <div className={style.inputI}>
              <label>Marca: </label>
              <input
                type="text"
                value={input.marca}
                name="marca"
                onChange={(e) => handlerChange(e)}
              ></input>
              {errors.marca && <p className={style.errors}>{errors.marca}</p>}
            </div>

            <div className={style.inputI}>
              <label>Stock: </label>
              <input
                type="number"
                value={input.stock}
                name="stock"
                onChange={(e) => handlerChange(e)}
              ></input>
              {errors.stock && <p className={style.errors}>{errors.stock}</p>}
            </div>

            <div className={style.catDiv}>
              <div className={style.category}>
                <label>Categoría: </label>
                <select onChange={(e) => handlerSelectCateg(e)}>
                  <option hidden>Seleccione una...</option>
                  {categs.map((c) => (
                    <option value={c} key={categs.indexOf(c)}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <Link
                to="/modifCateg"
                style={{ textDecoration: "none" }}
                className={style.button}
              >
                Administrar Categorías
              </Link>
            </div>

            <div className={style.publicar}>
              <button
                type="submit"
              // disabled={
              //   !input.nombre ||
              //   errors.nombre ||
              //   errors.precio ||
              //   errors.color ||
              //   errors.talla ||
              //   errors.marca ||
              //   !input.categoria
              // }
              >
                Publicar Producto!
              </button>
            </div>
          </form>
        </div >
      </div >
    </div >
  );
}
