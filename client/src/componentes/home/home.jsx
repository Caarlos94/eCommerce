import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/actions.js';
import s from './home.module.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <h1>NavBar</h1>
      <div className={s.hero}>
        <div className={s.textoHero}>
          <h1>Texto de prueba</h1>
          <p>holaholaholaholahola</p>
        </div>
      </div>
      <h1>Cards</h1>
    </div>
  );
};

export default Home;
