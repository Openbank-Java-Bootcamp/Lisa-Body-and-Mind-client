import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      HomePage
      <Link to="/programs">My Programs</Link>
      <Link to="/programs/new">New Program</Link>
      <Link to="/progress">My Progress</Link>
    </div>
  );
}
