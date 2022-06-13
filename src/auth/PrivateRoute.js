import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const PrivateRoute = ({component}) => component;

export default withAuthenticationRequired(PrivateRoute, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
