import React, { useEffect } from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/actions';

function Cards() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productsHome);

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  return (
    <div className="container d-flex justify-content-center h-100 align-items-center">
      <div className="row">
        {allProducts.map((card) => (
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
  );
}

export default Cards;
