import React, { useEffect, useState } from "react";
import QAAnsweredQuestions from "./QAAnsweredQuestions";
import QAForm from "./QAForm";
import classes from "./QASection.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

const QASection = (props) => {

  const [isAdmin, setIsAdmin] = useState(false);

  const {
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    const checkForAdminRole = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        let decoded = jwt_decode(accessToken);

        if (decoded.permissions.includes("read:admin")) {
          // verificación principalmente estética. No brinda seguridad.
          setIsAdmin(true);
        }
      }
    };
    checkForAdminRole();
  }, [isAuthenticated, getAccessTokenSilently]);



  return (
    <div className={classes["QASection-container"]}>
      <div className={classes["answered-questions"]}>
        <div></div>
        <QAAnsweredQuestions productId={props.productId} />
        <div></div>
      </div>
      {!isAdmin && (
        <QAForm productId={props.productId} />
      )}
    </div>
  );
};

export default QASection;
