import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton } from "../auth/exportedAuth";

export default function NavBar() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <nav className="Navbar">
        <Link to="/">
          <button>Home</button>
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/programs">
              <button>Programs</button>
            </Link>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </nav>
    </div>
  );
}
