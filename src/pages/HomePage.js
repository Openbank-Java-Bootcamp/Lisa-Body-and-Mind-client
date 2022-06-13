import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../auth/exportedAuth";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div className="homePage">
      HomePage
      <ul>
        <li>
          <Link to="/programs">My Programs</Link>
        </li>
        <li>
          <Link to="/programs/new">New Program</Link>
        </li>
        <li>
          <Link to="/progress">My Progress</Link>
        </li>
      </ul>
    </div>
  ) : (
    <div className="loggedOutHomePage">
      <h1>Welcome to Body&Mind</h1>
      <p>Please Log In</p>
      <LoginButton />
    </div>
  );
}
