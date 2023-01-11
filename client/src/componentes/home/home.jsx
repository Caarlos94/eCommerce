import React, { useState } from "react";
import { useEffect } from "react";
import { getCategorys, getProducts, getImages } from "../../redux/actions/actions.js";
import s from "./home.module.css";
import Navbar from "../navbar/navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../Paginate/Paginate.jsx";
import Card from "../Card/Card.js";
import Footer from "../Footer/Footer";

const Home = () => {
  const dispatch = useDispatch();
  let allProducts = useSelector((state) => state.productsHome);

  // allProducts.forEach(producto => producto.images = producto.images.split(","))
  // console.log(allProducts)

  useEffect(() => {
    dispatch(getImages());
    dispatch(getProducts());
    dispatch(getCategorys());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1); // DEBERIA SER UN REDUCER
  const productsPerPage = 9;
  const lastIndex = currentPage * productsPerPage; // 1 * 8 = 8
  const firstIndex = lastIndex - productsPerPage; // 8 - 8 = 0
  const currentProducts = allProducts.slice(firstIndex, lastIndex);

  const fnPaginado = (page) => {  // FUNCIÓN PARA MODIFICAR EL ESTADO LOCAL PAGE
    setCurrentPage(page);
  };

  const paginatePrev = (prevPage) => setCurrentPage(prevPage);

  const paginateNext = (nextPage) => setCurrentPage(nextPage);



  return (
    <div className={s.divaHome}>
      <Navbar setPages={setCurrentPage} />
      <img src="../../img/messi.jpg" alt="" className={s.imgH}/>
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
          <div className={s.section}>
            {currentProducts.map((card) => parseInt(card.stock) > 0 && (
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
      ) : (
        <div className={s.notFound}>
          <h1>Estamos buscando lo que necesitas!</h1>
          <h2>En caso de no cargar te recomendamos refrescar la página...</h2>
          <img
            src={'https://i.makeagif.com/media/11-11-2015/AAP2zs.gif'}
            width="200px"
            alt="img"
          ></img>
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

      <Footer />
    </div>
  );
};

export default Home;
