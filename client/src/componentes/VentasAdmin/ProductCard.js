import React /*, { useState, useEffect }*/ from 'react';
import classes from './ProductCard.module.css';
// import { Link } from "react-router-dom";

const ProductCard = ({ data /*clienteId, enviado*/ }) => {
  // const [didReview, setDidReview] = useState(true); //PRUEBA

  // //PRUEBA
  // useEffect(() => {
  //   fetch(
  //     `http://localhost:3001/compras/review-match?clienteId=${clienteId}&productoId=${data.productoId}`
  //   )
  //     .then((data) => data.json())
  //     .then((data) => {
  //       if (data.error === true) {
  //         setDidReview(true);
  //       } else {
  //         setDidReview(false);
  //       }
  //       // console.log(data);
  //     });
  // }, [clienteId, data.productoId]);

  return (
    <div className={classes['product-card']}>
      <div className={classes['img-container']}>
        <img src={data.url} alt={data.name}></img>
      </div>
      <div className={classes['product-info-container']}>
        <p className={classes['bold-text']}>{data.nombre}</p>
        <p className={classes['info']}>Talla: {data.talla}</p>
        <p className={classes['info']}>Color: {data.color}</p>
        <p className={classes['info']}>Precio: ${data.precio}</p>
        <p className={classes['info']}>Cantidad: {data.cantidad}</p>
      </div>

      {/* {enviado && !didReview ? ( // PRUEBA
        <Link
          to={{
            pathname: "/review-form",
            state: { clienteId, producto: data },
          }}
        >
          <button>TEST add review button</button>
        </Link>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default ProductCard;
