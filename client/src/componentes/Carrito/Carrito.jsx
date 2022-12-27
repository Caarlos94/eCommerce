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
import Navbar from '../navbar/navbar';

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
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (!cart.length) return; // manejar mejor la respuesta al intentar comprar con un carrito vacio?

    fetch("http://localhost:3001/pagosMeli", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) console.log(data); // manejar caso de error
        window.open(data, "_self");
        /* console.log(data); */
      });
  };

  return (
    <div className={s.cont}>
      <Navbar />
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
        <div>
          Total compra:
        </div>
      </div>
    </div>
  );
};

export default Carrito;
