import React, { useState } from 'react';
import { useEffect } from 'react';
import { getProducts, orderPrecio } from '../../redux/actions/actions.js';
import s from './home.module.css';
import Navbar from '../navbar/navbar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../Paginate/Paginate.jsx';
import Card from '../Card/Card.js';
import messiNotFound from '../../img/messiNotFound.gif';
// import Carrusell from './carrusel/carrusel.jsx';


const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productsHome);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // DEBERIA SER UN REDUCER
  const productsPerPage = 9;
  const lastIndex = currentPage * productsPerPage; // 1 * 8 = 8
  const firstIndex = lastIndex - productsPerPage; // 8 - 8 = 0
  const currentProducts = allProducts.slice(firstIndex, lastIndex);

  const fnPaginado = (page) => {
    // FUNCIÓN PARA MODIFICAR EL ESTADO LOCAL PAGE
    setCurrentPage(page);
  };

  const paginatePrev = (prevPage) => setCurrentPage(prevPage);

  const paginateNext = (nextPage) => setCurrentPage(nextPage);

  const handlerOrderPrecio = (e) => {
    e.preventDefault();
    dispatch(orderPrecio(e.target.value));
    setCurrentPage(1); //cuando hago el ordenamiento seteo para que arranque en la prim página
    setOrder(`Ordenado ${e.target.value}`); //cuando seteo esta página, me modifica el estado local y lo modifica
  };

  return (
    <div>
      <Navbar setPages={setCurrentPage} />
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
        productsPerPage={productsPerPage} // pupsPerPage
        totalProducts={allProducts.length} // totalPups
        paginate={fnPaginado} //paginate
        paginatePrev={paginatePrev}
        currentPage={currentPage}
        paginateNext={paginateNext}
        key={allProducts.id}
      ></Paginado>


      {allProducts.length > 0 ? (
        <div>
          <select onChange={(e) => handlerOrderPrecio(e)} className={s.select}>
            <option hidden>Ordenar por Precio</option>
            <option value="asc">Menor a Mayor</option>
            <option value="desc">Mayor a Menor</option>
          </select>

          <div>
            <div /* className="container d-flex justify-content-center h-100 align-items-center" */
            >
              <div className={s.section}>
                {currentProducts.map((card) => (
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
          <h1>Estamos buscando lo que necesitas!</h1>
          <h2>En caso de no cargar te recomendamos refrescar la página...</h2>
          <img src={messiNotFound} alt="img"></img>
        </div>
      )}
      <Paginado
        productsPerPage={productsPerPage} // pupsPerPage
        totalProducts={allProducts.length} // totalPups
        paginate={fnPaginado} //paginate
        paginatePrev={paginatePrev}
        currentPage={currentPage}
        paginateNext={paginateNext}
        key={allProducts.id}
      ></Paginado>
    </div>
  );
};

export default Home;
