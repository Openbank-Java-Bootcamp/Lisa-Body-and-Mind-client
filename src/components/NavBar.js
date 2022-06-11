import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav className="Navbar">
        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/programs">
          <button>Programs</button>
        </Link>
      </nav>
    </div>
  );
}
