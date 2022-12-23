import React from 'react';
import s from './Carrito.module.css';
import SearchBar from '../navbar/searchBar/searchBar';
import back from '../../img/back.png';
import heart from '../../img/heart-regular.svg';
import usuario from '../../img/user.svg';
/* import shopping from '../../img/shopping.png'; */
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartProduct from './CartProduct';
import { useAuth0 } from '@auth0/auth0-react';
import {
  clearCart,
  removeAllFromCart,
  removeOneFromCart,
  addOneToCart,
} from '../../redux/actions/actions';

const Carrito = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);


  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0()
  const handleDelete = (id, all = false) => {
    console.log(id, all);
    if (all) {
      dispatch(removeAllFromCart(id));
    } else {
      dispatch(removeOneFromCart(id));
    }
  };

  const handleAdd = (id) => {
    dispatch(addOneToCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleBuy = () => {
    fetch('http://localhost:3001/pagosMeli', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) console.log(data); // manejar caso de error
        window.open(data, '_self');
        /* console.log(data); */
      });
  };

  return (
    <div className={s.cont}>
      <div className={s.detailHeader}>
        <div className={s.black}></div>
        <div className={s.white}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <div className={s.backHome}>
              <img src={back} alt=""></img>
              Inicio
            </div>
          </NavLink>
          <div className={s.search}>
            <SearchBar />
          </div>
          <div className={s.btns}>
            {isAuthenticated ? (
              <div className={s.profileMenu}>
                <details>
                  <summary>Hola {user.nickname}!</summary>
                  <div className={s.desplegable}>
                    <div>
                      <Link to="/profile" style={{ textDecoration: 'none' }} className={s.button}>Perfil</Link>
                    </div>
                    <div>
                      <button onClick={() => logout()} className={s.button}>Cerrar sesión</button>
                    </div>
                  </div>
                </details>
              </div>
            ) : (
              <button onClick={() => loginWithRedirect()} className={s.btn}> <img src={usuario} alt=""></img> </button>
            )}
            <div className={s.btn}>
              <img src={heart} alt=""></img>
            </div>
            {/* <NavLink to="/cart" className={s.carro}>
              <div className={s.btn}>
                <img src={shopping} alt=""></img>
              </div>
            </NavLink> */}
          </div>
        </div>
      </div>
      <div className={s.cartCont}>
        <h1>Carrito</h1>
        <button onClick={() => handleClear()} className={s.limpiar}>
          Limpiar
        </button>
        <div className={s.total}>
          <p>Total:</p>
        </div>
        <button className={s.pagar} onClick={() => handleBuy()}>
          Pagar ahora
        </button>
        {cart ? (
          cart.map((c) => (
            <CartProduct
              key={c.id}
              id={c.id}
              nombre={c.nombre}
              talla={c.talla}
              precio={c.precio}
              cantidad={c.cantidad}
              URL={c.URL}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
            />
          ))
        ) : (
          <p>No tienes productos en tu carrito</p>
        )}
      </div>
    </div>
  );
};

export default Carrito;
