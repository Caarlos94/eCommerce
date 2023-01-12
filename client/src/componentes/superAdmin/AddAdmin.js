import React, { useEffect, useState, useCallback } from "react";
import classes from "./AddAdmin.module.css";

const AddAdmin = ({ accessToken, cueParentUpdate, cueHandler }) => {
  const postAdminUrl = "https://suprasports.up.railway.app/superAdmin/addAdminRole";
  const getNonAdminsUrl = "https://suprasports.up.railway.app/superAdmin/fetchNonAdmins";
  const [nonAdmins, setNonAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ email: "", idType: "googleId" });
  const [didAdd, setDidAdd] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredValue, setFilteredValue] = useState("");
  const [response, setResponse] = useState({});

  //RESOLVER PROBLEMA DE SELECT. NO ACTUALIZA VALOR SI SELECCIONO LA OPCION QUE MOSTRABA INICIALMENTE

  const fetchNonAdmins = useCallback(() => {
    fetch(`${getNonAdminsUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          return console.log(response.error);
        }
        setNonAdmins(response);
      });
  }, [accessToken]);

  useEffect(() => {
    console.log("padre actualizó add", cueParentUpdate);
    fetchNonAdmins();
  }, [fetchNonAdmins, cueParentUpdate]);

  useEffect(() => {
    didAdd && fetchNonAdmins();
  }, [didAdd, fetchNonAdmins]);

  useEffect(() => {
    setNewAdmin(nonAdmins[0]);
  }, [nonAdmins]);

  useEffect(() => {
    setFilteredUsers(
      nonAdmins.filter((user) => user.email.includes(filteredValue))
    );
  }, [filteredValue, nonAdmins]);

  const handleChange = (e) => {
    setNewAdmin(JSON.parse(e.target.value));
  };

  const handleFilteredValue = (e) => {
    setFilteredValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${postAdminUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ newAdmin }),
    })
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          cueHandler();
        }, 200);

        setResponse(response);

        if (!response.error) {
          setDidAdd(true);
        }
        if (response.error) {
          setResponse(response);
        }
      });
  };

  return (
    <div>
      <div className={classes["add-role-container"]}>
        <div className={classes["add-title"]}></div>
        <div className={classes["add-role-form"]}>
          <p>Agregar permisos de Admin a usuarios</p>

          <form onSubmit={handleSubmit}>
            <div className={classes["email-select"]}>
              <label htmlFor="email">Usuarios sin role Admin:</label>
              <br />
              <select onChange={handleChange} name="email">
                {/*mapear nonadmins aqui. object en index user serÃ¡ el valor*/}
                {nonAdmins.length && !filteredValue
                  ? nonAdmins.map((user) => (
                      <option value={JSON.stringify(user)} key={user.id}>
                        {user.email} | {user.idType}
                      </option>
                    ))
                  : ""}
                {filteredUsers.length && filteredValue
                  ? filteredUsers.map((user) => (
                      <option value={JSON.stringify(user)} key={user.id}>
                        {user.email} | {user.idType}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className={classes["filter-users"]}>
              <label htmlFor="filter">Filtrar usuarios por email:</label>
              <input
                onChange={handleFilteredValue}
                name="filter"
                value={filteredValue}
                type="text"
              ></input>
            </div>

            <div className={classes["add-submit"]}>
              <button type="submit">Agregar role Admin</button>
            </div>
            <div className={classes["response-container"]}>
              {response.hasOwnProperty("msg") && <p>{response.msg}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;