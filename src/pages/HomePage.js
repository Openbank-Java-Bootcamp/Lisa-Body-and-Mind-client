import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {

  
  return (
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
  );
}
