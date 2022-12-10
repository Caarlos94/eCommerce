import React from 'react';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions/actions.js';
import s from './home.module.css';
import Navbar from '../navbar/navbar.jsx';
import Cards from '../Card/Cards';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  const handlerClick = (e) => {
    e.preventDefault();
    dispatch(getProducts())
  }
  return (
    <div>
      <Navbar />
      <NavLink to='/'>
        <button onClick={e => handlerClick(e)}>Volver a cargar todos los productos!</button>
      </NavLink>
      <div className={s.hero}>
        <div className={s.textoHero}>
          <h1>Supra Sports</h1>
          <button>AAAAAA</button>{/* botón de "ver colección" */}
        </div>

        <div className={s.imgHero}>
          <div>
            <div className={s.img1}></div>
            <div className={s.img11}></div>
          </div>
          <div>
            <div className={s.img2}></div>
            <div className={s.img3}></div>
          </div>

        </div>

      </div>

      <div className="App">
        <Cards />
      </div>
    </div>
  );
};

export default Home;
