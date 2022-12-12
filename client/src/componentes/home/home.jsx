import React, { useState } from 'react';
import { useEffect } from 'react';
import { getProducts, orderPrecio } from '../../redux/actions/actions.js';
import s from './home.module.css';
import Navbar from '../navbar/navbar.jsx';
<<<<<<< HEAD
import Cards from '../Card/Cards';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../Paginate/Paginate'


/* const DATOS_API = Array.from({length:60}, (value, index) => {
  return{id:index, title:`Item #${index}`}
}) */

const ITEMS_PER_PAGE = 10

=======
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../Paginate/Paginate.jsx';
import Card from '../Card/Card.js';
import messiNotFound from '../../img/messiNotFound.gif'


>>>>>>> development
const Home = () => {
  const dispatch = useDispatch();
  /* const error = useSelector((state) => state.error); */
  const allProducts = useSelector((state) => state.productsHome);


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

    console.log('prev')
  }
=======
  const [order, setOrder] = useState('');
  const [page, setPages] = useState(1); // CREAMOS UN ESTADO PARA MANEJAR EL PAGINADO
  const productsPerPage = 8
  const lastIndex = page * productsPerPage // 1 * 8 = 8
  const firstIndex = lastIndex - productsPerPage   // 8 - 8 = 0
  const currentPage = allProducts.slice(firstIndex, lastIndex);

  const fnPaginado = (page) => {   // FUNCIÓN PARA MODIFICAR EL ESTADO LOCAL PAGE
    setPages(page);
  };

  const handlerOrderPrecio = (e) => {
    e.preventDefault();
    dispatch(orderPrecio(e.target.value));
    setPages(1); //cuando hago el ordenamiento seteo para que arranque en la prim página
    setOrder(`Ordenado ${e.target.value}`)//cuando seteo esta página, me modifica el estado local y lo modifica
  };
>>>>>>> development

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
<<<<<<< HEAD
      <div className="App">
        <Cards />
      </div>
      <Paginate currentPage={currentPage} items={items} nextHandler={nextHandler} prevHandler={prevHandler}>
      </Paginate>
    </div>
=======
      {allProducts.length > 0
        ? <div>
          <Paginado
            currentPage={currentPage}
            key={allProducts.id}
            productos={allProducts.length}
            productsPerPage={productsPerPage}
            fnPaginado={fnPaginado}>
          </Paginado>

          <select onChange={e => handlerOrderPrecio(e)} className={s.b}>
            <option hidden>Ordenar por Precio</option>
            <option value="asc">Menor a Mayor</option>
            <option value="desc">Mayor a Menor</option>
          </select>

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
        :
        <div className={s.notFound}>
          <h1 >No se encontraron coincidencias!</h1>
          <img src={messiNotFound} alt='img'></img>
        </div>
      }
    </div >
>>>>>>> development
  );
};

export default Home;