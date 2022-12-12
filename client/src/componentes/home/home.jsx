import React from 'react';
import { useEffect, useState } from 'react';
import { getProducts } from '../../redux/actions/actions.js';
import s from './home.module.css';
import Navbar from '../navbar/navbar.jsx';
import Cards from '../Card/Cards';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import Paginate from '../Paginate/Paginate'

=======
import Paginado from '../Paginate/Paginate.jsx';
import Card from '../Card/Card.js';
import messiNotFound from '../../img/messiNotFound.gif';
>>>>>>> joaquin-dileo

/* const DATOS_API = Array.from({length:60}, (value, index) => {
  return{id:index, title:`Item #${index}`}
}) */

const ITEMS_PER_PAGE = 10

const Home = () => {
  const dispatch = useDispatch();
<<<<<<< HEAD
=======
  /* const error = useSelector((state) => state.error); */
  const allProducts = useSelector((state) => state.productsHome);
>>>>>>> joaquin-dileo

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

<<<<<<< HEAD
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
  }
=======
  const [order, setOrder] = useState('');
  const [page, setPages] = useState(1); // CREAMOS UN ESTADO PARA MANEJAR EL PAGINADO
  const productsPerPage = 8;
  const lastIndex = page * productsPerPage; // 1 * 8 = 8
  const firstIndex = lastIndex - productsPerPage; // 8 - 8 = 0
  const currentPage = allProducts.slice(firstIndex, lastIndex);

  const fnPaginado = (page) => {
    // FUNCIÓN PARA MODIFICAR EL ESTADO LOCAL PAGE
    setPages(page);
  };

  const handlerOrderPrecio = (e) => {
    e.preventDefault();
    dispatch(orderPrecio(e.target.value));
    setPages(1); //cuando hago el ordenamiento seteo para que arranque en la prim página
    setOrder(`Ordenado ${e.target.value}`); //cuando seteo esta página, me modifica el estado local y lo modifica
  };
>>>>>>> joaquin-dileo

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
      {allProducts.length > 0 ? (
        <div>
          <Paginado
            currentPage={currentPage}
            key={allProducts.id}
            productos={allProducts.length}
            productsPerPage={productsPerPage}
            page={page}
            fnPaginado={fnPaginado}
          ></Paginado>

          <select onChange={(e) => handlerOrderPrecio(e)} className={s.b}>
            <option hidden>Ordenar por Precio</option>
            <option value="asc">Menor a Mayor</option>
            <option value="desc">Mayor a Menor</option>
          </select>

          <div>
            <div /* "container d-flex justify-content-center h-100 align-items-center" */>
              <div className={s.section}>
                {currentPage.map((card) => (
                  <div key={card.id}>
                    <Card
                      nombre={card.nombre}
                      URL={card.URL}
                      marca={card.marca}
                      precio={card.precio}
                      color={card.color}
                      talla={card.talla}
                      categoria={card.categoria}
                      id={card.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={s.notFound}>
          <h1 >Estamos buscando lo que necesitas!</h1>
          <h2>En caso de no cargar te recomendamos refrescar la página...</h2>
          <img src={messiNotFound} alt='img'></img>
        </div>
      )}
      <Paginado
        currentPage={currentPage}
        key={allProducts.id}
        productos={allProducts.length}
        productsPerPage={productsPerPage}
        page={page}
        fnPaginado={fnPaginado}
      ></Paginado>
    </div>
  );
};

export default Home;
