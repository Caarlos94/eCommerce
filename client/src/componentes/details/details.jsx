import React, { useEffect, useState } from "react";
import s from "./details.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetails,
  limpiarState,
  addToCart,
  addToFavorite,
  getReviews,
  getFavorites,
  deleteProd,
  removeOneFromCart,
} from "../../redux/actions/actions.js";
import { NavLink, useHistory, useParams } from "react-router-dom";
import heart from "../../img/heart-regular.svg";
import trash from "../../img/trash.png";
import edit from "../../img/edit.png";
import QASection from "../customersQA/QASection"; // La sección de QA del producto. Debe ir en este componente. Falta posicionarlo bien, dar estilos etc
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";
import Navbar2 from "../navbar/navBar2";
import Footer from "../Footer/Footer";
import Reviews from "../Reviews/Reviews";
import { Toaster, toast } from "react-hot-toast";

const Details = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const details = useSelector((state) => state.details);
  const [token, setToken] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [, setFavoritos] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [, setDidDelete] = useState(false);
  const [input, setInput] = useState({
    email: "",
    productoId: "",
  });

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  let { id } = useParams();

  useEffect(() => {
    user && dispatch(getFavorites(user.email));
    dispatch(limpiarState());
    dispatch(getDetails(id));
    dispatch(getReviews(id));
    /* return function () {
      dispatch(getProducts());
    }; */

    if (user) {
      setInput({
        email: user.email,
        productoId: id,
      });
    }
  }, [dispatch, id, user]);

  useEffect(() => {
    const checkForAdminRole = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
        let decoded = jwt_decode(accessToken);

        if (decoded.permissions.includes('read:admin')) {
          // verificación principalmente estética. No brinda seguridad.
          setIsAdmin(true);
        }
      }
    };

    if (user) {
      setInput({
        email: user.email,
        productoId: id,
      });
    }

    checkForAdminRole();
    if (user) {
      fetch(`https://suprasports.up.railway.app/favoritos/${user.email}`)
        .then((data) => data.json())
        .then((data) => {
          setFavoritos(data.productos);
          setClienteId(data.clienteId);
        });
    }
    /* console.log(user); */
  }, [id, user, isAuthenticated, getAccessTokenSilently]);

  const handleDelete = () => {
    fetch(`https://suprasports.up.railway.app/favoritos/${clienteId}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setDidDelete(true);
      });
  };

  const favoritos = useSelector((state) => state.favorites);
  let actualInFav = favoritos.filter((fav) => fav.id === id);
  const carrito = useSelector((state) => state.cart);
  let actualInCart = carrito.filter((prod) => prod.id === id);

  const handleAdd = () => {
    user && dispatch(getFavorites(user.email));
    if (actualInFav.length === 0) {
      dispatch(addToFavorite(input));
      toast.success("El producto se agrego a favoritos.");
      user && dispatch(getFavorites(user.email));
    } else {
      handleDelete();
      toast.error("El producto se quitó de favoritos.");
      user && dispatch(getFavorites(user.email));
    }
  };
  const handleDeleteProd = (id, token) => {
    console.log(id + " ELIMINADO");
    console.log("token:", token);
    dispatch(deleteProd(id, token)).then(
      toast("Producto eliminado con éxito! Se te redirigirá al inicio...")
    );
    history.push("/");
  };

  const handleSubmit = (id) => {
    if (actualInCart.length === 0) {
      dispatch(addToCart(id)) && toast.success("El producto fue añadido al carrito.");
    } else {
      dispatch(removeOneFromCart(id));
      toast.error('El producto se quitó del carrito.');
    }
  };

  return (
    <div>
      <Navbar2 />
      <div>
        {details.length ? (
          <div className={s["parent-container"]}>
            <div className={s.detailCont}>
              <div className={s.imgCont}>
                <div className={s.img11}>
                  <div
                    className={s.img111}
                    style={{ backgroundImage: `url(${details[0].URL})` }}
                  ></div>
                </div>
              </div>
              <div className={s.textCont}>
                <div className={s.productDesc}>
                  <p className={s.marca}>{details[0].marca}</p>
                  <p className={s.nombre}>{details[0].nombre}</p>
                  <p className={s.precio}>${details[0].precio}</p>
                  {/* <p className={s.categoria}>Categoría: {details[0].color}</p> */}
                  <p className={s.color}>Color: {details[0].color}</p>
                  <p className={s.talla}>
                    Talla: {details[0].talla.toUpperCase()}
                  </p>
                  {/* <button className={s.buttonTalle}>XS</button>
                  <button className={s.buttonTalle}>S</button>
                  <button className={s.buttonTalle}>M</button>
                  <button className={s.buttonTalle}>L</button>
                  <button className={s.buttonTalle}>XL</button>
                  <button className={s.buttonTalle}>XXL</button> */}
                  {details[0].stock > 0 ? (
                    <p className={s.stock}>Stock: {details[0].stock}</p>
                  ) : (
                    <p className={s.stock}>
                      Producto no disponible! Stock agotado momentáneamente...
                    </p>
                  )}
                </div>
                {!isAdmin ? (
                  <div className={s.botones}>
                    <button
                      disabled={details[0].stock === 0}
                      onClick={() => handleSubmit(id)}
                      className={
                        actualInCart.length > 0 ? s.añadido : s.añadirCart
                      }
                    >
                      AÑADIR AL CARRITO
                    </button>
                    {user ? (
                      <>
                        <div
                          className={actualInFav.length > 0 ? s.current : s.fav}
                          onClick={() => handleAdd(id)}
                        >
                          <img src={heart} alt=""></img>
                        </div>
                      </>
                    ) : (
                      <div className={s.fav} /* onClick={toast.error('Necesita iniciar sesión para guardar en favoritos.')} */>
                        <img src={heart} alt=""></img>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={s.btns}>
                    <button
                      /* value={categ} */
                      onClick={() => handleDeleteProd(id, token)}
                    >
                      <img src={trash} alt=""></img>
                    </button>

                    <NavLink
                      to={`/updateProd/${id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img src={edit} alt=""></img>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
            <div className={s.qyaCont}>
              <QASection productId={id} />
            </div>
            <div className={s.valoraciones}>
              <Reviews reviews={reviews} />
            </div>
            <Footer />
          </div>
        ) : (
          <div className={s.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>

      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
          style: {
            background: "#fff",
            color: "#000",
          },
        }}
      />
    </div>
  );
};

export default Details;
