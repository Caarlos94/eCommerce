import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import s from './Carrito.module.css';
import { useSelector, useDispatch } from 'react-redux';
import CartProduct from './CartProduct';
import {
  clearCart,
  removeAllFromCart,
  removeOneFromCart,
  addOneToCart,
} from '../../redux/actions/actions';
import Navbar2 from '../navbar/navBar2';
import { NavLink } from 'react-router-dom';


const Carrito = () => {


  const { user, isAuthenticated, loginWithRedirect } = useAuth0()
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [usuarioid, setUsuaruioId] = useState('');


  useEffect(async () => {

    if (isAuthenticated === true) {
      if (cart.length) {
        const idUsuariodb = await axios.post("http://localhost:3001/compras/obtenerId", {
          User: user.nickname
        })

        if (idUsuariodb) setUsuaruioId(idUsuariodb.data);
      }
    }
  }, [])


  const handleDelete = (id, all = false) => {
    //console.log(id, all);
    if (all) {
      dispatch(removeAllFromCart(id));
    } else {
      let producto = cart.find(producto => producto.id === id)
      producto.stock++
      if (id === cart.id) cart[0].stock++
      dispatch(removeOneFromCart(id));
    }
  };

  const handleAdd = (id) => {
    let producto = cart.find(producto => producto.id === id)
    producto.stock--
    if (producto.stock > 0) {
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
      body: JSON.stringify({ items: cart, idUsuario: usuarioid }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) console.log(data); // manejar caso de error
        window.open(data, '_self');
        /* console.log(data); */
      });
    // handleStock()
  };
  let totalProd = 0;
  cart.map(prod => totalProd += prod.cantidad * prod.precio);

  // console.log(usuarioid);

  return (
    <div className={s.cont}>
      <Navbar2 />
      <div className={s.cartCont}>
        <h1>Carrito</h1>
        <button onClick={() => handleClear()} className={s.limpiar}>
          Limpiar
        </button>
        <div className={s.total}>
          <p>Total: ${totalProd}</p>
        </div>
        <button className={s.pagar} onClick={() => handleBuy()}>
          Pagar ahora
        </button>
        <NavLink to={"/formCompra"}>
          <button /* className={s.pagar} */>
            Llenar datos para envío
          </button>
        </NavLink>
        {
          cart ? (
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
              />
            ))
          ) : (
            <p>No tienes productos en tu carrito</p>
          )
        }
      </div >
      <div className={s.totalFinal}>
        <div className={s.total2}>
          <p>Total: ${totalProd}</p>
        </div>
        <button className={s.pagar2} onClick={() => handleBuy()}>
          Pagar ahora
        </button>
      </div>
    </div >
  );
};

export default Carrito;
