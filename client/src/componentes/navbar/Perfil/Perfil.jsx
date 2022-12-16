import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import style from './Perfil.module.css'
import back from '../../../img/back.png';
import {useDispatch, useSelector } from "react-redux";
import { getUserInfo, postUser} from "../../../redux/actions/actions";
import Card from "../../Card/Card";

const Perfil = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  /* const users = useSelector((state) => state.users) */
  const allProducts = useSelector((state) => state.productsHome);

  const [input, setInput] = useState({
    nickname: user.nickname,
    mail: user.email,
    /* password: '', */
    picture: user.picture,
    direction: '',
    cel: '',
    cp: '',
    purchase_history: '',
  }); 

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };


  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postUser(input));
    setTimeout(() => dispatch(getUserInfo()), 100);
    alert('Información guardada con éxito!');
    setInput({
      nickname: user.nickname,
      mail: user.email,
      /* password: '', */
      picture: user.picture,
      direction: '',
      cel: '',
      cp: '',
      purchase_history: '',
    });
  };

  return (
    <div>
      <div className={style.createHeader}>
        <div className={style.black}></div>
        <div className={style.white}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <div className={style.backHome}>
              <img src={back} alt=""></img>
              Atrás
            </div>
          </NavLink>
        </div>
      </div>
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

            <div className={style.inputs}>
              <form onSubmit={(e) => handlerSubmit(e)}>
                <div className={style.info}>
                  <h5>Direccion: </h5>
                  <input
                    type="text"
                    name="direction"
                    value={input.direction}
                    onChange={(e) => handlerChange(e)}></input>
                </div>

                <div className={style.info}>
                  <h5>Celular: </h5>
                  <input
                    type="number"
                    name="cel"
                    value={input.cel}
                    onChange={(e) => handlerChange(e)}></input>
                </div>

                <div className={style.info}>
                  <h5>Código Postal: </h5>
                  <input
                    type="number"
                    name="cp"
                    value={input.cp}
                    onChange={(e) => handlerChange(e)}></input>
                </div>

                <div className={style.guardarInfo}>
                  <button type="submit">
                    Guardar información
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}
      </div>
      <div className={style.relacionados}>
        <h4>Productos recomendados para vos!</h4>
        <div className={style.section}>
          { allProducts.map((card) => card.categoria === 'Camperas' && (
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
    </div>
  )
}
export default Perfil;