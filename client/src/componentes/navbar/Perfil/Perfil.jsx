import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from './Perfil.module.css'
import { useDispatch, useSelector } from "react-redux";
//import { getUserInfo, importUser, postUser } from "../../../redux/actions/actions";
import Card from "../../Card/Card";
import { getProducts } from "../../../redux/actions/actions";
import Navbar2 from "../navBar2";
import Footer from "../../Footer/Footer";

const Perfil = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.productsHome);
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
            <div className={style.infoName}>
              {/* <img src={user.picture} alt={user.name} /> */}
              <p>{user.name}</p>
            </div>
            <div className={style.info}>
              <p>Correo: {user.email}</p>
            </div >

            <div className={style.info}>
              <p>Email verificado: {user.email_verified === true
                ? 'Si'
                : 'No, verificar por favor.'}</p>
            </div >

            <div className={style.info}>
              <p>Rol: {user.nickname === 'suprasportspf'
                ? 'Administrador'
                : 'Usuario'}</p>
            </div >
          </div>
        )}
      </div>
      <hr />

      <div className={style.relacionados}>
        <h4>Productos recomendados para vos!</h4>
        <div className={style.section}>
          {allProducts.map((card) => card.categoria === 'Camperas' && (
            <div className={style.cardCont} key={card.id}>
              <Card
                className={style.card}
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
      <Footer />
    </div>
  )
}
export default Perfil;