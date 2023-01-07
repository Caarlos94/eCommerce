import React, { useEffect, useState } from "react";
import Navbar2 from "../navbar/navBar2.jsx";
import axios from "axios";
import style from "./superAdmin.module.css";
import { useValidateUser } from "../../customHooks/validate-user.js";
// import Admins from './Admins.j'
// import { Link } from "react-router-dom";
// import { element } from "prop-types";
// import e from "cors";

const SuperAdmin = (props) => {
  const [deleteAdmins, DeleteAdmins] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ email: "", idType: "googleId" });
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [timer, setTimer] = useState(null);
  const [disable, setDisable] = useState(true);

  const handleChange = (e) => {
    setDisable(true);

    setNewAdmin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    clearTimeout(timer); // NO FUNCIONA EL TIMER. REVISAR
    setEmailIsValid(true);

    const newTimer = setTimeout(() => {
      // toDo: No notificar validez si no hay un correo en el input de correo
      if (e.target.name === "email") {
        if (
          //eslint-disable-next-line
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newAdmin.email)
        ) {
          setEmailIsValid(true);
          setDisable(false);
        } else {
          setEmailIsValid(false);
          setDisable(true);
        }
      }
    }, 900);

    setTimer(newTimer);
  };

  useEffect(async () => {
    // const admins = '';
    const result = await axios.get(
      "http://localhost:3001/superAdmin/fetchRoles"
    );

    setAdmins(result.data);

    // console.log(result.data);
  }, []);

  const deleteAd = (params) => {
    DeleteAdmins([...deleteAdmins, params]);
  };

  const Delete = async () => {
    // console.log(deleteAdmins);
    const adminsdeletes = await axios.post(
      "http://localhost:3001/superAdmin/removeAdmin",
      deleteAdmins
    );

    if (adminsdeletes.data) {
      setTimeout(async () => {
        const result = await axios.get(
          "http://localhost:3001/superAdmin/fetchRoles"
        );

        setAdmins(result.data);
      }, 100);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className={style.divPadre}>
      <Navbar2></Navbar2>
      <div className={style.divAdmins}>
        <h2>usuarios con rol admin</h2>
        <div>
          {admins?.map((element) => {
            return (
              <div className={style.admin} key={element.user_id}>
                <h5>{element.email}</h5>
                <h5>{element.name}</h5>
                <button
                  onClick={() => deleteAd(element.user_id)}
                  className={style.buttonAdmins}
                >
                  eliminar admin
                </button>
              </div>
            );
          })}
          <button onClick={() => Delete()} className={style.admins}>
            delete admins
          </button>
        </div>
      </div>
      <div className={style["add-role-container"]}>
        <div className={style["add-title"]}></div>
        <div className={style["add-role-form"]}>
          <p>Agregar permisos de Admin a usuarios:</p>
          <form onSubmit={handleSubmit}>
            <div className={style["email-input"]}>
              <label htmlFor="email">email:</label>
              <br />
              <input
                onChange={handleChange}
                autoComplete="off"
                placeholder=" Ej: test@test.com"
                name="email"
                type="text"
                value={newAdmin.email}
              />
            </div>
            {!emailIsValid && newAdmin.email.length ? (
              <div className={style["email-warning"]}>
                El correo ingresado es inválido
              </div>
            ) : (
              ""
            )}
            <div className={style["id-select"]}>
              <label htmlFor="login">Tipo de login:</label>
              <br />
              <select onChange={handleChange} name="idType" selected="googleId">
                <option value="googleId">googleId</option>
                <option value="auth0Id">auth0Id</option>
              </select>
            </div>
            <div className={style["add-submit"]}>
              <button disabled={disable}>Agregar a role Admin</button>
            </div>
          </form>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default SuperAdmin;
