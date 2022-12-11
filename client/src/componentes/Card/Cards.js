import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/actions';
import Paginado from '../Paginate/Paginate';

function Cards() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productsHome);

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  const [page, setPages] = useState(1); // CREAMOS UN ESTADO PARA MANEJAR EL PAGINADO
  const productsPerPage = 8
  const lastIndex =  page * productsPerPage // 1 * 8 = 8
  const firstIndex = lastIndex - productsPerPage   // 8 - 8 = 0
  const currentePage = allProducts.slice(firstIndex, lastIndex);

  const fnPaginado = (page) => {   // FUNCIÓN PARA MODIFICAR EL ESTADO LOCAL PAGE
    setPages(page);
  };

  return (
    <div>
    <Paginado 
      key={allProducts.id}
      productos={allProducts.length}
      productsPerPage={productsPerPage}
      fnPaginado={fnPaginado}>  
    </Paginado>
    <div className="container d-flex justify-content-center h-100 align-items-center">
      <div className="row">
        {currentePage.map((card) => (
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

  );

}

export default Cards;
