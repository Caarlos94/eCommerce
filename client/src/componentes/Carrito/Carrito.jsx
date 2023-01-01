import React from 'react';
import s from './Carrito.module.css';
import SearchBar from '../navbar/searchBar/searchBar';
import back from '../../img/back.png';
import heart from '../../img/heart-regular.svg';
import usuario from '../../img/user.svg';
/* import shopping from '../../img/shopping.png'; */
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
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
  const [total, setTotal] = useState(0);

  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const handleDelete = (id, all = false) => {
    console.log(id, all);
    if (all) {
      dispatch(removeAllFromCart(id));
    } else {
      let producto = cart.find(producto => producto.id === id)
      producto.stock++
    if(id === cart.id) cart[0].stock++
      dispatch(removeOneFromCart(id));
    } 
  }; 
 
  const handleAdd = (id) => {
    let producto = cart.find(producto => producto.id === id)
    producto.stock--
    if(producto.stock <= 0) { 
    } else {
      dispatch(addOneToCart(id));
    }
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
      <Navbar />
      <div className={s.cartCont}>
        <h1>Carrito</h1>
        <button onClick={() => handleClear()} className={s.limpiar}>
          Limpiar
        </button>
        <div className={s.total}>
          <p>Total: ${total}</p>
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
              stock={c.stock}
              precio={c.precio}
              cantidad={c.cantidad}
              URL={c.URL}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
              total={total}
              setTotal={setTotal}
            />
          ))
        ) : (
          <p>No tienes productos en tu carrito</p>
        )}
      </div>
      <div className={s.totalFinal}>
        <div className={s.total2}>
          <p>Total: ${total}</p>
        </div>
        <button className={s.pagar2} onClick={() => handleBuy()}>
          Pagar ahora
        </button>
      </div>
    </div>
  );
};

export default Carrito;
