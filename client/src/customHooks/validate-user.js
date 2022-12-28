import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

export const useValidateUser = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const checkForAdminRole = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        let decoded = jwt_decode(accessToken);

        if (decoded.permissions.includes("read:admin")) {
          setIsAdmin(true);
        }
        setAccessToken(accessToken);
      }
    };
    checkForAdminRole();
  }, [isAuthenticated, getAccessTokenSilently]);

  return [isAuthenticated, isAdmin, accessToken];
};

// isAuthenticated PERMITE VERIFICAR SI EL USUARIO INICIO SESION
// isAdmin PERMITE VERIFICAR SI EL USUARIO DEBE TENER ACCESO A RECURSOS DEL ADMIN