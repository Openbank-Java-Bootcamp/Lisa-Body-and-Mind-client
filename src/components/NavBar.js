import React from "react";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton } from "../auth/exportedAuth";

export default function NavBar() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <button className="buttonBox" role="button">
          <span className="material-symbols-outlined">gite</span>
        </button>
      </Link>

      {isAuthenticated ? (
        <>
          <Link to="/programs">
            <button className="buttonBox" role="button">
              Programs
            </button>
          </Link>

          <LogoutButton />
          <Link to="/profile">
            <button className="buttonBox" role="button">
              <span className="material-symbols-outlined">person</span>
            </button>
          </Link>
        </>
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}
