import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from './Perfil.module.css'
import { useDispatch } from "react-redux";
//import { getUserInfo, importUser, postUser } from "../../../redux/actions/actions";
/* import Card from "../../Card/Card"; */
import { getProducts } from "../../../redux/actions/actions";
import Navbar2 from "../navBar2";
import Footer from "../../Footer/Footer";

const Perfil = () => {
  const dispatch = useDispatch();

/*   const allProducts = useSelector((state) => state.productsHome); */
  const { user, isAuthenticated, } = useAuth0();

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div>
      <Navbar2 />

      <div className={style.cont}>
        {isAuthenticated && (
          <div className={style.allInfo}>
            <div className={style.info}>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
            </div>
            <div className={style.info}>
              <h4>Correo: {user.email}</h4>
            </div >

            <div className={style.info}>
              <h4>Email verificado: {user.email_verified === true
                ? 'Si'
                : 'No, verificar por favor.'}</h4>
            </div >

            <div className={style.info}>
              <h4>Rol: {user.nickname === 'suprasportspf'
                ? 'Administrador'
                : 'Usuario'}</h4>
            </div >
          </div>
        )}
      </div>

      {/* <div className={style.relacionados}>
        <h4>Productos recomendados para vos!</h4>
        <div className={style.section}>
          {allProducts.map((card) => card.categoria === 'Camperas' && (
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
      </div> */}
      <Footer />
    </div>
  )
}
export default Perfil;