import React, { useState } from 'react';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions/actions.js';
import s from './home.module.css';
import Navbar from '../navbar/navbar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../Paginate/Paginate.jsx';
import Card from '../Card/Card.js';


const Home = () => {
  const dispatch = useDispatch();
  /* const error = useSelector((state) => state.error); */
  const allProducts = useSelector((state) => state.productsHome);


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [page, setPages] = useState(1); // CREAMOS UN ESTADO PARA MANEJAR EL PAGINADO
  const productsPerPage = 8
  const lastIndex = page * productsPerPage // 1 * 8 = 8
  const firstIndex = lastIndex - productsPerPage   // 8 - 8 = 0
  const currentPage = allProducts.slice(firstIndex, lastIndex);
  
  const fnPaginado = (page) => {   // FUNCIÓN PARA MODIFICAR EL ESTADO LOCAL PAGE
    setPages(page);
  };


  return (
    <div>
      <Navbar setPages={setPages} />
      <div className={s.hero}>
        <div className={s.textoHero}>
          <h1>Supra Sports</h1>
          <button>Ver coleccion</button>
        </div>
        <div className={s.imgHero}>
          <div className={s.messi}>
            <div className={s.img1}></div>
            <div className={s.img11}></div>
          </div>
          <div className={s.extras}>
            <div className={s.img2}></div>
            <div className={s.img3}></div>
          </div>
        </div>
      </div>
      <Paginado
        currentPage={currentPage}
        key={allProducts.id}
        productos={allProducts.length}
        productsPerPage={productsPerPage}
        fnPaginado={fnPaginado}>
      </Paginado>
      <div>
        <div className="container d-flex justify-content-center h-100 align-items-center">
          <div className="row">
            {currentPage.map((card) => (
              <div className="col-md-4" key={card.id}>
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
  );
};
/* 
{
  allProds.length > 0 ? (
    <div className="App">
      {error ? (
        <div>
          <h1>No se encontraron coincidencias!</h1>
          <img src={messiNotFound} alt="img"></img>
        </div>
      ) : (
        <Cards />
      )}
    </div>
  ) : (
  <div>
    <Loading />
  </div>
)
} */

export default Home;