import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Auth0Provider
      domain="body-and-mind.eu.auth0.com"
      clientId="6nc5zLgXnh4aLRaZrCjs7Q7CANmlzzr0"
      // where youd like to redirect after login:
      audience="https://body-and-mind.eu.auth0.com/api/v2/"
      redirectUri={window.location.origin}
      useRefreshTokens
      cacheLocation="localstorage"
      scope="read:current_user update:current_user_metadata"
    >
      <App />
    </Auth0Provider>
  </Router>
);
