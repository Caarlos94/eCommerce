import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Route } from "react-router-dom";

export const ProtectedRoute = ({ path, component, ...args }) => {
  return (
    <Route
      path={path}
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <div>Redirecting</div>,
      })}
      {...args}
    />
  );
};
