import React, { useState } from "react";
import { useEffect } from "react";
import { getProducts, orderPrecio } from "../../redux/actions/actions.js";
import s from "./home.module.css";
import Navbar from "../navbar/navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../Paginate/Paginate.jsx";
import Card from "../Card/Card.js";
import messiNotFound from "../../img/messiNotFound.gif";

const Home = () => {
  const dispatch = useDispatch();
  /* const error = useSelector((state) => state.error); */
  const allProducts = useSelector((state) => state.productsHome);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // CREAMOS UN ESTADO PARA MANEJAR EL PAGINADO
  const productsPerPage = 8;
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
      <Navbar setCurrentPage={setCurrentPage} />
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
          <select onChange={(e) => handlerOrderPrecio(e)} className={s.b}>
            <option hidden>Ordenar por Precio</option>
            <option value="asc">Menor a Mayor</option>
            <option value="desc">Mayor a Menor</option>
          </select>

          <div>
            <div className="container d-flex justify-content-center h-100 align-items-center">
              <div className="row">
                {currentProducts.map((card) => (
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
      ) : (
        <div className={s.notFound}>
          <h1>No se encontraron coincidencias!</h1>
          <img src={messiNotFound} alt="img"></img>
        </div>
      )}
    </div>
  );
};

export default Home;
