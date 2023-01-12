import React, { useState } from "react";
import { useEffect } from "react";
import { getCategorys, getProducts, AddPaginate} from "../../redux/actions/actions.js";
import s from "./home.module.css";
import Navbar from "../navbar/navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../Paginate/Paginate.jsx";
import Card from "../Card/Card.js";
import Footer from "../Footer/Footer";
import Carrusel from "./carrusel/carrusel.jsx";

const Home = () => {
  const dispatch = useDispatch();
  let allProducts = useSelector((state) => state.productsHome);
  let paginateNum = useSelector((state) => state.paginate);

  // allProducts.forEach(producto => producto.images = producto.images.split(","))
  // console.log(allProducts)
  const [currentPage, setCurrentPage] = useState(1); // DEBERIA SER UN REDUCER
  const productsPerPage = 9;
  const lastIndex = currentPage * productsPerPage; // 1 * 8 = 8
  const firstIndex = lastIndex - productsPerPage; // 8 - 8 = 0
  let currentProducts = allProducts.slice(firstIndex, lastIndex);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategorys());
    setCurrentPage(paginateNum);
  }, [dispatch , paginateNum]);

 

  const fnPaginado = (page) => {
    // localStorage.setItem("currentPage", JSON.stringify(page));
    // FUNCIÓN PARA MODIFICAR EL ESTADO LOCAL PAGE
    setCurrentPage(page);
    //  console.log(currentProducts); hacer un dispatch
    dispatch(AddPaginate(page));
    // setTimeout(() => {
    //   console.log('hola soy paginate num ' + paginateNum);
    // }, 500);
  };

  const paginatePrev = (prevPage) =>{
    setCurrentPage(prevPage);
    //  console.log(currentProducts); hacer un dispatch
    dispatch(AddPaginate(prevPage));
    // setTimeout(() => {
    //   console.log('hola soy paginate num ' + paginateNum);
    // }, 500);
  }

  const paginateNext = (nextPage) =>{
    setCurrentPage(nextPage);
    //  console.log(currentProducts); hacer un dispatch
    dispatch(AddPaginate(nextPage));
    // setTimeout(() => {
    //   console.log('hola soy paginate num ' + paginateNum);
    // }, 500);
  }

  return (
    <div className={s.divaHome}>
      <Navbar setPages={setCurrentPage} />
      {/* <img src="../../img/messi.jpg" alt="" className={s.imgH}/> */}
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

    <div className={s.divCarrusel}>
      <Carrusel></Carrusel>
      {/* <div className={s.divCarruselH2}>
         <h2 className={s.CarruselH2}> _   contamos con envios a todo el pais</h2>
         <h2 className={s.CarruselH2}> _   los mejores productos de calidad</h2>
         <h2 className={s.CarruselH2}> _   todo desde la comodidad de tu casa</h2>
      </div> */}
      
      {/* <div className={s.divSeparador}></div> */}
    </div>

    <div className={s.divSeparadorPaginado}>
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
            {currentProducts.map(
              (card) =>
                parseInt(card.stock) > 0 && (
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
                )
            )}
          </div>
        </div>
      ) : (
        <div className={s.notFound}>
          <h3>Estamos buscando lo que necesitas!</h3>
          <h3>En caso de no cargar te recomendamos refrescar la página...</h3>
          <img
            src={'https://i0.wp.com/i.pinimg.com/originals/bf/ea/4c/bfea4c915788805180111c4b93643c83.gif?resize=160,120'}
            // min-width="200px"
            alt="img"
            className={s.imgGif}
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


      <div className={s.divSeparador} ></div>

     <Footer />
     </div >

      
    </div>
  );
};

export default Home;
