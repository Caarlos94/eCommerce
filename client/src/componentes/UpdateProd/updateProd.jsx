import style from "./updateProd.module.css";
import Navbar2 from "../navbar/navBar2";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import {
  getDetails,
  getProducts2,
  updateProduct,
} from "../../redux/actions/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const validate = (input, prods) => {
  let errors = {};
  if (input.nombre) {
    if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.nombre)) {
      errors.nombre = "No se permiten caracteres especiales o números.";
    }
    if (
      prods.some((e) => e.nombre.toUpperCase() === input.nombre.toUpperCase())
    ) {
      errors.nombre = "Este producto ya existe!";
    }
  }
  if (input.URL) {
    if (!/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(input.URL)) {
      errors.URL = "Solo se permite imágenes de tipo .jpg/.png/.jpeg";
    }
  }
  if (input.precio) {
    if (input.precio < 1) {
      errors.precio = "Solo se permite números mayores a uno.";
    }
  }
  if (input.color) {
    if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.color)) {
      errors.color =
        "Solo se permiten caracteres especiales, números o espacios.";
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
      errors.marca = "No se permiten caracteres especiales o números.";
    }
  }
  if (input.stock) {
    if (input.stock < 0 || !/^[0-9]+$/.test(input.stock)) {
      errors.stock = "Solo se permiten números entero y mayor o igual 0.";
    }
  }
  return errors;
};

export default function UpdateProd() {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const prods = useSelector((state) => state.products);
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const { id } = useParams();
  const categs = useSelector((state) => state.categorys);

  useEffect(() => {
    getAccessTokenSilently().then((data) => setToken(data));
  }, [getAccessTokenSilently]);

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id])

  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    id: id,
    nombre: "",
    URL: '',
    precio: "",
    color: "",
    talla: "",
    marca: "",
    stock: "",
    categoria: ""
  });

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      }, prods
      ));
  };

  const handlerSelectCateg = (e) => {
    if (!input.categoria.includes(e.target.value)) {
      setInput({ ...input, categoria: e.target.value })
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(updateProduct(input, id, token));
    setTimeout(() => dispatch(getProducts2()), 100);
    alert("Producto actualizado con éxito! Se te redirigirá al inicio...");
    setInput({
      id: id,
      nombre: "",
      URL: '',
      precio: "",
      color: "",
      talla: "",
      marca: "",
      stock: "",
      categoria: ""
    });
    history.push("/");
  };
  console.log(details);

  return (
    <div>
      <Navbar2 />
      <div className={style.content}>
        <h1>Editor de Productos</h1>
        <h5>(Deje el cuadro vacío en caso de querer el valor previamente establecido.)</h5>

        {details.length && (
          <div className={style.forms}>
            <form onSubmit={(e) => handlerSubmit(e)}>
              <div className={style.inputI}>
                <label>Nombre: </label>
                <input
                  placeholder={`Anterior: ${details[0].nombre}`}
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
                  placeholder={`Anterior: ${details[0].URL}`}
                  type="url"
                  value={input.URL}
                  name="URL"
                  onChange={(e) => handlerChange(e)}
                ></input>
                {errors.URL
                  ? (<p className={style.errors}>{errors.URL}</p>)
                  : (input.URL) ? (<img src={input.URL} alt='img'></img>) : ("")}
              </div>

              <div className={style.inputI}>
                <label>Precio </label>
                <input
                  placeholder={`Anterior: ${details[0].precio}`}
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
                  placeholder={`Anterior: ${details[0].color}`}
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
                  placeholder={`Anterior: ${details[0].talla}`}
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
                  placeholder={`Anterior: ${details[0].marca}`}
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
                  placeholder={`Anterior: ${details[0].nombre}`}
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
                <button type="submit">
                  Publicar Producto!
                </button>
              </div>
            </form>
          </div>
        )}
      </div >
      <Footer />
    </div >
  );
};