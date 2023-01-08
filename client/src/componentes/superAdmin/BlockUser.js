import React from "react";
import classes from "./BlockUser.module.css";

const BlockUser = ({ accessToken }) => {
  return (
    <div className={classes["block-section-container"]}>
      <div className={classes["title-container"]}>
        <p>Bloqueos de usuario</p>
      </div>
      <div className={classes["block-options-container"]}>
        <div className={classes["unblock-container"]}>
          <p>Usuarios bloqueados:</p>
          {/*Aquí va el select de usuarios bloqueados */}
          <button>Desbloquear usuario</button>
        </div>

        <div className={classes["block-container"]}>
          <p>Usuarios sin bloqueo:</p>
          {/*Aquí va el select de usuarios sin bloquear */}
          <button>Bloquear usuario</button>
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
