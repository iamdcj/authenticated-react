import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ children, isAuthenticated }) => {
  return (
    <Route
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export { PrivateRoute };
