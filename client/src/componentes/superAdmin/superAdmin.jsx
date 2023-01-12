import React, { useEffect, useState } from 'react';
import Navbar2 from '../navbar/navBar2.jsx';
import axios from 'axios';
import style from './superAdmin.module.css';
import { useValidateUser } from '../../customHooks/validate-user.js';
import AddAdmin from './AddAdmin.js';
import BlockUser from './BlockUser.js';

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
        "https://suprasports.up.railway.app/superAdmin/fetchRoles",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setAdmins(result.data);
    };
    funct();
  }, [cueParentUpdate, cueChildUpdate, accessToken]);

  const deleteAd = (params) => {
    DeleteAdmins([...deleteAdmins, params]);
  };

  const Delete = async () => {
    fetch(`https://suprasports.up.railway.app/superAdmin/removeAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(deleteAdmins),
    })
      .then((data) => data.json())
      .then(() =>
        setTimeout(() => {
          setCueParentUpdate(cueParentUpdate + 1);
        }, 200)
      ); // lo pasé a promesas porque necesito actualizar a partir de la respuesta
  };

  return (
    <>
      {isSuperAdmin ? (
        <>
          <Navbar2></Navbar2>
          <div className={style.divPadre}>
            <div className={style["options-container"]}>
              <div className={style["left-side-superadmin"]}>
                <div className={style["add-container"]}>
                  <AddAdmin
                    cueHandler={() => setCueChildUpdate(Math.random())}
                    cueParentUpdate={cueParentUpdate}
                    accessToken={accessToken}
                  />
                </div>
                <div className={style.divAdmins}>
                  <p>Usuarios con rol admin</p>
                  <div>
                    {admins?.map((element) => {
                      console.log(element);
                      return (
                        <div className={style.admin} key={element.user_id}>
                          <h5>{element.email}</h5>
                          <h5>
                            {element.user_id.includes("google")
                              ? "GoogleID"
                              : "Auth0ID"}
                          </h5>
                          <button
                            onClick={() => deleteAd(element.user_id)}
                            className={style.buttonAdmins}
                          >
                            Seleccionar admin
                          </button>
                        </div>
                      );
                    })}
                    <button onClick={() => Delete()} className={style.admins}>
                      Eliminar admins
                    </button>
                  </div>
                </div>
              </div>
              <div className={style["right-side-superadmin"]}>
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
        </>
      ) : (
        'Sólo disponible para usuarios con role de Super Admin'
      )}
    </>
  );
};

export default SuperAdmin;
