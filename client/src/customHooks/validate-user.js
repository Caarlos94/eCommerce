import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

export const useValidateUser = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const checkForAdminRole = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        let decoded = jwt_decode(accessToken);
        setUserId(decoded.sub);

        if (decoded.permissions.includes("read:admin")) {
          setIsAdmin(true);
        }
        if (decoded.permissions.includes("read:users")) {
          setIsSuperAdmin(true);
        }
        setAccessToken(accessToken);
      }
    };
    checkForAdminRole();
  }, [isAuthenticated, getAccessTokenSilently]);

  return {
    isAuthenticated,
    isAdmin,
    accessToken,
    userId,
    isSuperAdmin,
    user,
  };
};
// isAuthenticated PERMITE VERIFICAR SI EL USUARIO INICIO SESION
// isAdmin PERMITE VERIFICAR SI EL USUARIO DEBE TENER ACCESO A RECURSOS DEL ADMIN