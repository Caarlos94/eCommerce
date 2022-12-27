import React from 'react';
import s from './Carrito.module.css';
import SearchBar from '../navbar/searchBar/searchBar';
import back from '../../img/back.png';
import heart from '../../img/heart-regular.svg';
import user from '../../img/user.svg';
import shopping from '../../img/shopping.png';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartProduct from './CartProduct';
import {
  clearCart,
  removeAllFromCart,
  removeOneFromCart,
  addOneToCart,
} from '../../redux/actions/actions';

const Carrito = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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
      // handleStock()
  };


  // const handleStock = () => {
  
  //   fetch('http://localhost:3001/redirect', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ items: cart }),
  //   })
     
  // };

  return (
    <div className={s.cont}>
      <div className={s.detailHeader}>
        <div className={s.black}></div>
        <div className={s.white}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <div className={s.backHome}>
              <img src={back} alt=""></img>
              Atrás
            </div>
          </NavLink>
          <div className={s.search}>
            <SearchBar />
          </div>
          <div className={s.btns}>
            <div className={s.btn}>
              <img src={user} alt=""></img>
            </div>
            <div className={s.btn}>
              <img src={heart} alt=""></img>
            </div>
            <NavLink to="/cart" className={s.carro}>
              <div className={s.btn}>
                <img src={shopping} alt=""></img>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className={s.cartCont}>
        <h1>Carrito</h1>
        <button onClick={() => handleClear() } className={s.limpiar}>
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
