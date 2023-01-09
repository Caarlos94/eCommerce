import React, { useEffect, useState } from "react";
import Navbar2 from "../navbar/navBar2.jsx";
import axios from "axios";
import style from "./superAdmin.module.css";
import { useValidateUser } from "../../customHooks/validate-user.js";
import AddAdmin from "./AddAdmin.js";
import BlockUser from "./BlockUser.js";

// import Admins from './Admins.j'
// import { Link } from "react-router-dom";
// import { element } from "prop-types";
// import e from "cors";

const SuperAdmin = (props) => {
  const [deleteAdmins, DeleteAdmins] = useState([]);
  const [admins, setAdmins] = useState([]);

  const { accessToken, isSuperAdmin } = useValidateUser();

  useEffect(async () => {
    const result = await axios.get(
      "http://localhost:3001/superAdmin/fetchRoles"
    );

    setAdmins(result.data);
  }, []);

  const deleteAd = (params) => {
    DeleteAdmins([...deleteAdmins, params]);
  };

  const Delete = async () => {
    //NECESITA PASAR TOKEN DE ACCESSO
    const adminsdeletes = await axios.post(
      "http://localhost:3001/superAdmin/removeAdmin",
      deleteAdmins
    );

    // Probar implementarlo de esta forma
    // axios trae respuesta de vuelta. respuesta actualiza estado de variable. cambio variable activa useEffect que vuelve a traer los roles

    if (adminsdeletes.data) {
      setTimeout(async () => {
        const result = await axios.get(
          "http://localhost:3001/superAdmin/fetchRoles"
        );

        setAdmins(result.data);
      }, 100);
    }
  };

  return (
    <>
      {isSuperAdmin ? (
        <div className={style.divPadre}>
          <Navbar2></Navbar2>
          <div className={style["options-container"]}>
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
            <div className={style["right-side"]}>
              <div className={style["add-container"]}>
                <AddAdmin accessToken={accessToken} />
              </div>
              <div className={style["blocking-options"]}>
                <BlockUser accessToken={accessToken} block={true} />
              </div>
              <div className={style["blocking-options"]}>
                <BlockUser accessToken={accessToken} block={false} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Sólo disponible para usuarios con role de Super Admin"
      )}
    </>
  );
};

export default SuperAdmin;
