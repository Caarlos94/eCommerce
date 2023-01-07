import React, { useEffect, useState } from "react";
import SearchBar from "./searchBar/searchBar.jsx";
import Filtros from "./filtros/filtros.jsx";
import style from "./navbar.module.css";
import "./navbarr.css";
import { Link, NavLink } from "react-router-dom";
import heart from "../../img/heart-regular.svg";
import usuario from "../../img/user.svg";
import shopping from "../../img/shopping.png";
import answers from "../../img/answ.png";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, importUser } from "../../redux/actions/actions.js";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

const Navbar = ({ setPages }) => {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.cart);
  const favoritos = useSelector((state) => state.favorites);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  const {
    user,
    loginWithRedirect,
    isAuthenticated,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    const checkForAdminRole = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        let decoded = jwt_decode(accessToken);

        if (decoded.permissions.includes("read:admin")) {
          // verificación principalmente UX. No brinda seguridad.
          setIsAdmin(true);
        }
      }
    };
    checkForAdminRole();
  }, [isAuthenticated, getAccessTokenSilently]);

  const [isOpen, SetOpen] = useState(false);

  user && dispatch(importUser(user));

  // {console.log(user)}

  return (
    <div className={style.div}>
      <div className={style.black}>
        <div className={style.Hamburguesa} onClick={() => SetOpen(!isOpen)}>
          <span className="span"></span>
          <span className="span"></span>
          <span className="span"></span>
        </div>
      </div>
      <div className={`white ${isOpen && "open"}`}>
        <div className={style.filtros}>
          <Filtros setPages={setPages} />
        </div>

        <div className={style.searchBar}>
          <SearchBar setPages={setPages} />
        </div>

        <div className={style.btns}>
          {isAuthenticated ? (
            <div className={style.profileMenu}>
              <details>
                <summary>Hola {user.nickname}!</summary>
                <div className={style.desplegable}>
                  <div>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none" }}
                      className={style.button}
                    >
                      Perfil
                    </Link>
                  </div>
                  {!isAdmin && (
                    <div>
                      <Link
                        to="/historial"
                        style={{ textDecoration: "none" }}
                        className={style.button}
                      >
                        Historial
                      </Link>
                    </div>
                  )}
                  <div>
                    <button onClick={() => logout()} className={style.button}>
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </details>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()} className={style.btn}>
              <img src={usuario} alt=""></img>
            </button>
          )}

          {isAdmin ? (
            <div className={style.admin}>
              <div className={style.publicar}>
                <NavLink to="/product" style={{ textDecoration: "none" }}>
                  <button>Publicar un Producto!</button>
                </NavLink>
              </div>
              <div className={style.qa}>
                <NavLink to="/answers">
                  <div className={style.btnQA}>
                    <img src={answers} alt=""></img>
                  </div>
                </NavLink>
              </div>
              <div className={style.publicar}>
                <NavLink to="/sales" style={{ textDecoration: "none" }}>
                  <button>Historial de Ventas</button>
                </NavLink>
              </div>
            </div>
          ) : (
            <>
              {carrito.length > 0 ? (
                <NavLink
                  to="/cart"
                  className={style.carro}
                  style={{ textDecoration: "none" }}
                >
                  <div className={style.btn}>
                    <h6>{carrito.length}</h6>
                    <img src={shopping} alt=""></img>
                  </div>
                </NavLink>
              ) : (
                <NavLink to="/cart" className={style.carro}>
                  <div className={style.btn}>
                    <img src={shopping} alt=""></img>
                  </div>
                </NavLink>
              )}
              {favoritos.length > 0 ? (
                <NavLink to="/favorites">
                  <div className={style.btn}>
                    <h6>{favoritos.length}</h6>
                    <img src={heart} alt=""></img>
                  </div>
                </NavLink>
              ) : (
                <NavLink to="/favorites">
                  <div className={style.btn}>
                    <img src={heart} alt=""></img>
                  </div>
                </NavLink>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
