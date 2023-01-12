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
import {
  getFavorites,
  getProducts,
  importUser,
} from "../../redux/actions/actions.js";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

const Navbar = ({ setPages }) => {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.cart);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const {
    user,
    loginWithRedirect,
    isAuthenticated,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  let email;
  user && (email = user.email);

  useEffect(() => {
    dispatch(getProducts);

    const checkForAdminRole = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        let decoded = jwt_decode(accessToken);

        if (decoded.permissions.includes('read:admin')) {
          // verificación principalmente UX. No brinda seguridad.
          setIsAdmin(true);
        }
        if (decoded.permissions.includes('read:users')) {
          setIsSuperAdmin(true);
        }
      }
    };
    checkForAdminRole();
    user && dispatch(getFavorites(email));
  }, [user, isAuthenticated, getAccessTokenSilently, dispatch, email]);

  const favoritos = useSelector((state) => state.favorites);

  const [isOpen, SetOpen] = useState(false);

  useEffect(() => {
    user &&
      fetch('https://suprasports.up.railway.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  }, [user]);

  user && dispatch(importUser(user));

  return (
    <div className={style.div}>
      <div className={style.black}>
        <div className={style.Hamburguesa} onClick={() => SetOpen(!isOpen)}>
          <span className="span"></span>
          <span className="span"></span>
          <span className="span"></span>
        </div>
      </div>
      <div className={`white ${isOpen && 'open'}`}>
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
                      style={{ textDecoration: 'none' }}
                      className={style.button}
                    >
                      Perfil
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        localStorage.setItem("cart", JSON.stringify([]));
                        logout();
                      }}
                      className={style.button}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                  {isAdmin ? (
                    <div className={style.adminn}>
                      <div className={style.historialV}>
                        <NavLink to="/sales" style={{ textDecoration: "none" }}>
                          <button>Historial de Ventas</button>
                        </NavLink>
                      </div>
                      <div className={style.publicar}>
                        <NavLink
                          to="/product"
                          style={{ textDecoration: "none" }}
                        >
                          <button>Publicar un Producto</button>
                        </NavLink>
                      </div>
                      {isSuperAdmin ? (
                        <div className={style.btnAdmin}>
                          <NavLink
                            to="/superAdmin"
                            style={{ textDecoration: 'none' }}
                          >
                            <button>Gestionar Permisos de Admin</button>
                          </NavLink>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    <div className={style.historialC}>
                      <NavLink
                        to="/historial"
                        style={{ textDecoration: "none" }}
                      >
                        <button>Mis Compras</button>
                      </NavLink>
                    </div>
                  )}
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
              <div className={style.qa}>
                <NavLink to="/answers">
                  <div className={style.btnQA}>
                    <img src={answers} alt=""></img>
                  </div>
                </NavLink>
              </div>
            </div>
          ) : (
            <>
              {user ? (
                <>
                  <NavLink to="/cart" className={style.carro}>
                    <div className={style.btn}>
                      {carrito.length > 0 && <h6>{carrito.length}</h6>}
                      <img src={shopping} alt=""></img>
                    </div>
                  </NavLink>
                  <NavLink to={`/favoritos/${user.email}`}>
                    <div className={style.btn}>
                      {favoritos.length > 0 && <h6>{favoritos.length}</h6>}
                      <img src={heart} alt=""></img>
                    </div>
                  </NavLink>
                </>
              ) : (
                <>
                  <div className={style.carro}>
                    <div className={style.btn} onClick={() => loginWithRedirect()}>
                      {carrito.length > 0 && <h6>{carrito.length}</h6>}
                      <img src={shopping} alt=""></img>
                    </div>
                  </div>
                  <div>
                    <div className={style.btn} onClick={() => loginWithRedirect()}>
                      <img src={heart} alt=""></img>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
