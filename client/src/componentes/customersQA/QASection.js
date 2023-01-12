import React, { useEffect, useState } from "react";
import QAAnsweredQuestions from "./QAAnsweredQuestions";
import QAForm from "./QAForm";
import classes from "./QASection.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

const QASection = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isSubscribed = true;

    const checkForAdminRole = (isAuthenticated) => {
      if (isAuthenticated) {
        getAccessTokenSilently()
          .then((accessToken) => jwt_decode(accessToken))
          .then((decoded) => {
            if (decoded.permissions.includes("read:admin")) {
              // verificación principalmente estética. No brinda seguridad.
              if (isSubscribed) setIsAdmin(true);
            }
          });
      }
    };

    checkForAdminRole(isAuthenticated);
    return () => (isSubscribed = false);
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div className={classes["QASection-container"]}>
      <div className={classes["answered-questions"]}>
        <QAAnsweredQuestions productId={props.productId} />
      </div>
      {!isAdmin && <QAForm productId={props.productId} />}
    </div>
  );
};

export default QASection;
