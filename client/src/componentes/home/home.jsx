import React from 'react';
import { useEffect } from 'react';
import { getProducts } from '../../redux/actions/actions.js';
import s from './home.module.css';
import Navbar from '../navbar/navbar.jsx';
import Cards from '../Card/Cards';
import { useDispatch} from 'react-redux';


const Home = () => {
  const dispatch = useDispatch();
  /* const allProds = useSelector((state) => state.products); */
  /* const error = useSelector((state) => state.error); */

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className={s.hero}>
        <div className={s.textoHero}>
          <h1>Supra Sports</h1>
          <button>Ver coleccion</button>{/* botón de "ver colección" */}
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
      <div>
        <Cards />
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
