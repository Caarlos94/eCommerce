import React, { useEffect, useState } from 'react';
import s from './details.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetails,
  limpiarState,
  addToCart,
  addToFavorite,
  getProducts,
  getReviews,
  getFavorites,
} from '../../redux/actions/actions.js';
import { NavLink, useParams } from 'react-router-dom';
import heart from '../../img/heart-regular.svg';
import trash from '../../img/trash.png';
import edit from '../../img/edit.png';
import QASection from '../customersQA/QASection'; // La sección de QA del producto. Debe ir en este componente. Falta posicionarlo bien, dar estilos etc
import { useAuth0 } from '@auth0/auth0-react';
import jwt_decode from 'jwt-decode';
import Navbar2 from '../navbar/navBar2';
import Footer from '../Footer/Footer';
import Reviews from '../Reviews/Reviews';
import { Toaster, toast } from 'react-hot-toast';

const Details = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const details = useSelector((state) => state.details);

  const [isAdmin, setIsAdmin] = useState(false);
  const [, setFavoritos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [, setDidDelete] = useState(false);
  const [input, setInput] = useState({
    email: '',
    productoId: '',
  });

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  let { id } = useParams();

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

    if (user) {
      setInput({
        email: user.email,
        productoId: id,
      });
    }

    checkForAdminRole();
    if (user) {
      fetch(`http://localhost:3001/favoritos/${user.email}`)
        .then((data) => data.json())
        .then((data) => {
          setFavoritos(data.productos);
          setClienteId(data.clienteId);
        });
    }
    dispatch(limpiarState());
    dispatch(getDetails(id));
    dispatch(getReviews(id));
    user && dispatch(getFavorites(user.email))
    return function () {
      dispatch(getProducts());
    };
  }, [dispatch, id, user, isAuthenticated, getAccessTokenSilently]);


  const handleDelete = () => {
    // console.log("hello");
    fetch(`http://localhost:3001/favoritos/${clienteId}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setDidDelete(true);
      });
  };

  const favoritos = useSelector((state) => state.favorites);
  let actual = favoritos.filter(fav => fav.id === id)

  const handleAdd = () => {
    user && dispatch(getFavorites(user.email))
    if (actual.length === 0) {
      dispatch(addToFavorite(input));
      toast.success('El producto se agrego a favoritos');
      user && dispatch(getFavorites(user.email))
    } else {
      handleDelete()
      toast.error('El producto se elimino de favoritos');
      user && dispatch(getFavorites(user.email))
    }
  };

  const handleSubmit = (id) => {
    dispatch(addToCart(id));
    toast.success('El producto fue añadido al carrito');
  };

  return (
    <div>
      <Navbar2 />
      <div>
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
                  <h2 className={s.h2}>{details[0].nombre.toUpperCase()}</h2>
                  <h3>${details[0].precio}</h3>
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
                      className={s.añadirCart}
                    >
                      AÑADIR AL CARRITO
                    </button>
                    {user ? (
                      <>
                        { }
                        <div
                          className={actual.length > 0 ? s.current : s.fav}
                          onClick={() => handleAdd(id)}
                        >
                          <img src={heart} alt=""></img>
                        </div>
                      </>
                    ) : (
                      <div className={s.fav}>
                        <img src={heart} alt=""></img>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={s.btns}>
                    <button
                      /* value={categ} */
                      onClick={() => handleDelete(id)}
                    >
                      <img src={trash} alt=""></img>
                    </button>

                    <NavLink
                      to={`/updateProd/${id}`}
                      style={{ textDecoration: 'none' }}
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
        <Footer />
      </div>
      <Toaster
        toastOptions={{
          // Define default options
          className: '',
          duration: 3000,
          style: {
            background: '#fff',
            color: '#000',
          },
        }}
      />
    </div>
  );
};

export default Details;