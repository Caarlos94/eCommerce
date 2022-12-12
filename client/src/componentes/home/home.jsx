import React from 'react';
import { useEffect, useState } from 'react';
import { getProducts } from '../../redux/actions/actions.js';
import s from './home.module.css';
import Navbar from '../navbar/navbar.jsx';
import Cards from '../Card/Cards';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../Paginate/Paginate'


/* const DATOS_API = Array.from({length:60}, (value, index) => {
  return{id:index, title:`Item #${index}`}
}) */

const ITEMS_PER_PAGE = 10

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const allProductos = useSelector(state=>state.products)

  const [datosFromApi, setDatosFromApi] = useState(allProductos);

  const [items, setItems] = useState([...allProductos].splice(0, ITEMS_PER_PAGE));

  const [currentPage, setCurrentPage] = useState(0);

  const nextHandler = () => {
    const totalElementos = datosFromApi.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * ITEMS_PER_PAGE;
    if (firstIndex === totalElementos) return;
    setItems([...datosFromApi].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(nextPage);
  }

  
  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * ITEMS_PER_PAGE;
    setItems([...datosFromApi].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(prevPage);

    console.log('prev')
  }

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
      <div className="App">
        <Cards />
      </div>
      <Paginate currentPage={currentPage} items={items} nextHandler={nextHandler} prevHandler={prevHandler}>
      </Paginate>
    </div>
  );
};

export default Home;
