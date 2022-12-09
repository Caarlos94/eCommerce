// <<<<<<< HEAD
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/actions.js';
import s from './home.module.css';
import Navbar from '../navbar/navbar.jsx';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <Navbar />
      <div className={s.hero}>
        <div className={s.textoHero}>
          <h1>Supra Sports</h1>
          <button>AAAAAA</button>
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
      <h1>Cards</h1>
    </div>
  );
};

export default Home;
// =======
// import React from 'react'
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { getProducts } from '../../redux/actions/actions.js'

// const Home = () => {

//     const dispatch = useDispatch()

// useEffect(()=>{
// dispatch(getProducts())
// },[])

//     return (
//       <div></div>
//     )

// }

// export default Home
// >>>>>>> development
