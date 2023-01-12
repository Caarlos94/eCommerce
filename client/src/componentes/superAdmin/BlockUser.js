import React, { useEffect, useState, useCallback } from "react";
import classes from "./BlockUser.module.css";

const BlockUser = ({ accessToken, block, handler, cue }) => {
  let lastId = 0;

  const newId = () => {
    lastId++;
    return lastId;
  };

  // ruta para traer lista de users => block === true? trae usuarios sin bloquear : trae usuarios bloqueados
  const getUsersUrl = "https://suprasports.up.railway.app/superAdmin/getUsers";

  // ruta para bloquear y desbloquear => block === true? bloquea usuario enviado : desbloquea usuario enviado
  const postBlockedUserUrl = "https://suprasports.up.railway.app/superAdmin/blockUser";

  const [users, setUsers] = useState([]);
  const [blockedUser, setBlockedUser] = useState({});
  const [didBlock, setDidBlock] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredValue, setFilteredValue] = useState("");
  const [response, setResponse] = useState({});

  //RESOLVER PROBLEMA DE SELECT. NO ACTUALIZA VALOR SI SELECCIONO LA OPCION QUE MOSTRABA INICIALMENTE

  const fetchUsers = useCallback(() => {
    fetch(`${getUsersUrl}?blocked=${!block}`, {
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
        setUsers(response);
      });
  }, [block, accessToken]);

  useEffect(() => {
    console.log(cue); // no eliminar cue
    fetchUsers();
  }, [fetchUsers, cue]);

  useEffect(() => {
    didBlock && fetchUsers();
  }, [didBlock, fetchUsers]);

  useEffect(() => {
    users.length && setBlockedUser(users[0]);
  }, [users]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => user.email.includes(filteredValue)) // customizar filtro
    );
  }, [filteredValue, users]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setBlockedUser(JSON.parse(e.target.value));
  };

  const handleFilteredValue = (e) => {
    setFilteredValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${postBlockedUserUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ user: blockedUser, block }),
    })
      .then((response) => response.json())
      .then((response) => {
        setResponse(response);
        setTimeout(() => {
          handler();
        }, 200);

        if (!response.error) {
          setDidBlock(true);
        }
        if (response.error) {
          setResponse(response);
        }
      });
    console.log({ user: blockedUser, block });
  };

  return (
    <div className={classes["blocking-container"]}>
      <div className={classes["blocking-title"]}></div>
      <div className={classes["blocking-form"]}>
        <p>{block ? "Bloquear usuarios" : "Desbloquear usuarios"}</p>

        <form onSubmit={handleSubmit}>
          <div className={classes["email-select"]}>
            <label htmlFor="email">
              {block ? "Usuarios sin bloqueos: " : "Usuarios bloqueados: "}
            </label>
            <br />
            {users.length && !filteredValue ? (
              <select onChange={handleChange} name="email">
                {/*mapear users aqui. object en index user será el valor*/}{" "}
                <option disabled={true} defaultValue={true} value="">
                  Seleccionar correo
                </option>
                {users.map((user) => (
                  <option value={JSON.stringify(user)} key={newId()}>
                    {user.email} | {user.idType}
                  </option>
                ))}
              </select>
            ) : (
              ""
            )}
            {filteredUsers.length && filteredValue ? (
              <select onChange={handleChange} name="email">
                {filteredUsers.map((user) => (
                  <option value={JSON.stringify(user)} key={newId()}>
                    {user.email} | {user.idType}
                  </option>
                ))}
              </select>
            ) : (
              ""
            )}
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

          <div className={classes["blocking-submit"]}>
            <button type="submit">
              {block ? "Bloquear usuarios" : "Desbloquear usuarios"}
            </button>
          </div>
          <div className={classes["response-container"]}>
            {response.hasOwnProperty("msg") && <p>{response.msg}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlockUser;
