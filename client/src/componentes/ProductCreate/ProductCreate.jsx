import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink, Link } from 'react-router-dom';
import {
  getCategorys,
  getProducts,
  getProducts2,
  postProd,
} from '../../redux/actions/actions';
import style from './ProductCreate.module.css';
/* import SearchBar from '../navbar/searchBar/searchBar'; */
import back from '../../img/back.png';
import usuario from '../../img/user.svg';
import { useAuth0 } from '@auth0/auth0-react';

const validate = (input, prods) => {
  let errors = {};
  if (input.nombre) {
    if (!(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/).test(input.nombre)) {
      errors.nombre = 'Este dato es incorrecto... Es obligatorio, no se permiten caracteres especiales o números.'
    }
    if (prods.some(e => e.nombre.toUpperCase() === input.nombre.toUpperCase())) {
      errors.nombre = 'Este producto ya existe!'
    }
  }
  if (input.URL) {
    if (!(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i).test(input.URL)) {
      errors.URL = 'Este dato es obligatorio, solo permite imágenes de tipo .jpg/.png/.jpeg'
    }
  }
  if (input.precio) {
    if (input.precio < 1) {
      errors.precio = 'Este dato es obligatorio, solo permite números mayores a uno.'
    }
  }
  if (input.color) {
    if (!(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/).test(input.color)) {
      errors.color = 'Este dato es obligatorio, no se permiten caracteres especiales, números o espacios.'
    }
  }
  if (input.talla) {
    if (!(/^[A-Za-z0-9\s]+$/).test(input.talla)) {
      errors.talla = 'Este dato es obligatorio, no se permiten caracteres especiales.'
    }
  }
  if (input.marca) {
    if (!(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/).test(input.marca)) {
      errors.marca = 'Este dato es obligatorio, no se permiten caracteres especiales o números.'
    }
  }
  if (input.stock) {
    if (input.stock < 0 || !(/^[0-9]+$/).test(input.stock)) {
      errors.stock = 'Este dato es obligatorio, solo permite números entero y mayor o igual 0.'
    }
  }
  return errors;
}

export default function ProdCreate() {
  const dispatch = useDispatch();
  const prods = useSelector((state) => state.products);
  const categs = useSelector((state) => state.categorys);

  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0()

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
        prods
      )
    );
  };

  const handlerSelectCateg = (e) => {
    if (!input.categoria.includes(e.target.value)) {
      setInput({
        ...input,
        categoria: e.target.value,
      });
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postProd(input));
    setTimeout(() => dispatch(getProducts2()), 100);
    alert('Producto publicado con éxito! Se te redirigirá al inicio...');
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
    history.push('/'); //me manda al home
  };

  return (
    <div>
      <div className={style.createHeader}>
        <div className={style.black}></div>
        <div className={style.white}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <div className={style.backHome}>
              <img src={back} alt=""></img>
              Inicio
            </div>
          </NavLink>
          <div className={style.btns}>
            {isAuthenticated ? (
              <div className={style.profileMenu}>
                <details>
                  <summary>Hola {user.nickname}!</summary>
                  <div className={style.desplegable}>
                    <div>
                      <Link to="/profile" style={{ textDecoration: 'none' }} className={style.button}>Perfil</Link>
                    </div>
                    <div>
                      <button onClick={() => logout()} className={style.button}>Cerrar sesión</button>
                    </div>
                  </div>
                </details>
              </div>
            ) : (
              <button onClick={() => loginWithRedirect()} className={style.btn}> <img src={usuario} alt=""></img> </button>
            )}
          </div>
        </div>
      </div>
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
                type="text"
                value={input.URL}
                name="URL"
                onChange={(e) => handlerChange(e)}
              ></input>
              {errors.URL
                ? <p className={style.errors}>{errors.URL}</p>
                : input.URL
                  ? <img src={input.URL} alt='img'></img>
                  : ""
              }
            </div>

            <div className={style.inputI}>
              <label>Precio </label>
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

            <div className={style.category}>
              <label>Categoría: </label>
              <select onChange={(e) => handlerSelectCateg(e)}>
                {categs.map((c) => (
                  <option value={c} key={categs.indexOf(c)}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className={style.publicar}>
              <button
                type="submit"
                disabled={
                  !input.nombre ||
                  errors.nombre ||
                  errors.precio ||
                  errors.color ||
                  errors.talla ||
                  errors.marca ||
                  !input.categoria
                }
              >
                Publicar Producto!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}