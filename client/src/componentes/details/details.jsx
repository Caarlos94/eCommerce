import React, { useEffect, useState } from 'react';
import s from './details.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetails,
  limpiarState,
  addToCart,
  addToFavorite,
  removeFromFavorite,
  deleteProd,
  getProducts,
} from '../../redux/actions/actions.js';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import heart from '../../img/heart-regular.svg';
import trash from '../../img/trash.png';
import edit from '../../img/edit.png';
import QASection from '../customersQA/QASection'; // La sección de QA del producto. Debe ir en este componente. Falta posicionarlo bien, dar estilos etc
import { useAuth0 } from '@auth0/auth0-react';
import jwt_decode from 'jwt-decode';
import Navbar2 from '../navbar/navBar2';
import Footer from '../Footer/Footer';
import Reviews from '../Reviews/Reviews';

const Details = () => {
  const dispatch = useDispatch();
  /* const carrito = useSelector((state) => state.cart) */
  const history = useHistory();

  let { id } = useParams();

  useEffect(() => {
    dispatch(limpiarState());
    dispatch(getDetails(id));
    return function () {
      dispatch(getProducts())
    }
  }, [dispatch, id]);

  const details = useSelector((state) => state.details);
  const [isAdmin, setIsAdmin] = useState(false);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const checkForAdminRole = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        let decoded = jwt_decode(accessToken);

        if (decoded.permissions.includes('read:admin')) {
          // verificación principalmente estética. No brinda seguridad.
          setIsAdmin(true);
        }
      }
    };
    checkForAdminRole();
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleSubmit = (id) => {
    dispatch(addToCart(id));
    alert('Añadido con éxito al carrito');
  };

  const handleDelete = (id) => {
    console.log(id + ' ELIMINADO');
    dispatch(deleteProd(id))
      .then(alert("Producto publicado con éxito! Se te redirigirá al inicio..."))
    history.push("/");
  }
  const [isAdd, setIsAdd] = useState(false);

  const handleAdd = (id) => {
    setIsAdd((prev) => !prev);
    // dispatch(addToFavorite(id));
    if (isAdd === false) {
      dispatch(addToFavorite(id));
    } else {
      dispatch(removeFromFavorite(id));
    }
  };

  return (
    <div>
      <Navbar2 />

      {details.length ? (
        <div className={s['parent-container']}>
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
                <h2>{details[0].nombre.toUpperCase()}</h2>
                <h3>${details[0].precio} U$D</h3>
                <h5>Marca: {details[0].marca}</h5>
                <h5>Color: {details[0].color}</h5>
                <h5>Talla: {details[0].talla.toUpperCase()}</h5>
                {details[0].stock > 0 ? (
                  <h5>Stock: {details[0].stock}</h5>
                ) : (
                  <h5>
                    Producto no disponible! Stock agotado momentáneamente...
                  </h5>
                )}
              </div>
              {!isAdmin ? (
                <div className={s.botones}>
                  <button
                    disabled={details[0].stock === 0}
                    onClick={() => handleSubmit(id)}
                    className={s.añadirCart}>
                    AÑADIR AL CARRITO
                  </button>
                  <div
                    className={isAdd ? s.current : s.fav}
                    onClick={() => handleAdd(id)}
                  >
                    <img src={heart} alt=""></img>
                  </div>
                </div>
              ) : (
                <div className={s.btns}>
                  <button
                    /* value={categ} */
                    onClick={() => handleDelete(id)}>
                    <img src={trash} alt="" ></img>
                  </button>

                  <NavLink to={`/updateProd/${id}`} style={{ textDecoration: "none" }}>
                    <img src={edit} alt=""></img>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          <div className={s.qyaCont}>
            <QASection productId={id} />
          </div>
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
      {/* <div className={s.valoraciones}>
        <Reviews />
      </div> */}
      <Footer />
    </div>
  );
};

export default Details;
