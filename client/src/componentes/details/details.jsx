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
  getReviews,
  getFavorites,
  getCategorys
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
import { Toaster, toast } from 'react-hot-toast';

const Details = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector((state) => state.reviews);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [input, setInput] = useState({
    email: '',
    productoId: '',
  })

  let { id } = useParams();

  useEffect(() => {
    if (user) {
      setInput({
        email: user.email,
        productoId: id,
      });
    }
  }, [user, id]);

  useEffect(() => {
    dispatch(limpiarState());
    dispatch(getDetails(id));
    dispatch(getReviews(id));
    dispatch(getCategorys(id));

    return function () {
      dispatch(getProducts());
    };
  }, [dispatch, id]);
  user && dispatch(getFavorites(user.email));


  const details = useSelector((state) => state.details);
  const categories = useSelector((state) => state.categories);
  const [isAdmin, setIsAdmin] = useState(false);

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
    toast.success('El producto fue añadido al carrito');
  };

  const handleDelete = (id) => {
    console.log(id + ' ELIMINADO');
    dispatch(deleteProd(id)).then(
      alert('Producto eliminado con éxito! Se te redirigirá al inicio...')
    );
    history.push('/');
  };
  const [isAdd, setIsAdd] = useState(false);

  const handleAdd = (id) => {
    user && dispatch(getFavorites(user.email))
    setIsAdd((prev) => !prev);
    if (isAdd === false) {
      dispatch(addToFavorite(input));
      toast.success('El producto se agrego a favoritos');
    } else {
      dispatch(removeFromFavorite(id));
      toast.error('El producto se elimino de favoritos');
    }
  };

  user && dispatch(getFavorites(user.email))

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
                  <p className={s.marca}>{details[0].marca}</p>
                  <p className={s.nombre}>{details[0].nombre}</p>
                  <p className={s.precio}>${details[0].precio}</p>
                  <p className={s.categoria}>Categoria</p>
                  <p className={s.color}>Color: {details[0].color}</p>
                  <p className={s.talla}>Talla: {details[0].talla.toUpperCase()}</p>
                  <button className={s.buttonTalle}>XS</button>
                  <button className={s.buttonTalle}>S</button>
                  <button className={s.buttonTalle}>M</button>
                  <button className={s.buttonTalle}>L</button>
                  <button className={s.buttonTalle}>XL</button>
                  <button className={s.buttonTalle}>XXL</button>
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
                      className={s.añadirCart}
                    >
                      AÑADIR AL CARRITO
                    </button>
                    {user ? (
                      <div
                        className={isAdd ? s.current : s.fav}
                        onClick={() => handleAdd(id)}
                      >
                        <img src={heart} alt=""></img>
                      </div>
                    ) : (
                      <div className={isAdd ? s.current : s.fav}>
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
