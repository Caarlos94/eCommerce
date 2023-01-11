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
  const [cueParentUpdate, setCueParentUpdate] = useState(Math.random());
  const [cueChildUpdate, setCueChildUpdate] = useState(Math.random());
  const [cueBlock, setCueBlock] = useState(Math.random());
  const [cueUnblock, setCueUnblock] = useState(Math.random());

  const { accessToken, isSuperAdmin } = useValidateUser();

  useEffect(() => {
    console.log("Actualizacion de padre", cueParentUpdate, cueChildUpdate);
    const funct = async () => {
      const result = await axios.get(
        "http://localhost:3001/superAdmin/fetchRoles"
      );

      setAdmins(result.data);
    };
    funct();
  }, [cueParentUpdate, cueChildUpdate]);

  const deleteAd = (params) => {
    DeleteAdmins([...deleteAdmins, params]);
  };

  const Delete = async () => {
    //NECESITA PASAR TOKEN DE ACCESSO
    axios
      .post("http://localhost:3001/superAdmin/removeAdmin", deleteAdmins)
      .then((data) => data.data)
      .then(() =>
        setTimeout(() => {
          setCueParentUpdate(cueParentUpdate + 1);
        }, 200)
      ); // lo pasé a promesas porque necesito actualizar a partir de la respuesta

    // if (adminsdeletes.data) {
    //   setTimeout(async () => {
    //     const result = await axios.get(
    //       "http://localhost:3001/superAdmin/fetchRoles"
    //     );

    //     setAdmins(result.data);
    //   }, 100);
    // }
  };

  return (
    <>
      {isSuperAdmin ? (
        <div className={style.divPadre}>
          <Navbar2></Navbar2>
          <div className={style["options-container"]}>
            <div className={style.divAdmins}>
              <h2>Usuarios con rol admin</h2>
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
                        Eliminar admin
                      </button>
                    </div>
                  );
                })}
                <button onClick={() => Delete()} className={style.admins}>
                  Delete admins
                </button>
              </div>
            </div>
            <div className={style["right-side"]}>
              <div className={style["add-container"]}>
                <AddAdmin
                  cueHandler={() => setCueChildUpdate(Math.random())}
                  cueParentUpdate={cueParentUpdate}
                  accessToken={accessToken}
                />
              </div>
              <div className={style["blocking-options"]}>
                <BlockUser
                  handler={() => setCueUnblock()}
                  cueHandler={() => setCueChildUpdate(Math.random())}
                  cueParentUpdate={cueParentUpdate}
                  accessToken={accessToken}
                  block={true}
                  cue={cueBlock}
                />
              </div>
              <div className={style["blocking-options"]}>
                <BlockUser
                  handler={() => setCueBlock()}
                  cueHandler={() => setCueChildUpdate(Math.random())}
                  cueParentUpdate={cueParentUpdate}
                  accessToken={accessToken}
                  block={false}
                  cue={cueUnblock}
                />
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
