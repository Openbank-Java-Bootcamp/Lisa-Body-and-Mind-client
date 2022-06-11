import React from "react";
import { Link } from "react-router-dom";

export default function ProgramList({ programs }) {
  return (
    <div className="programsList">
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <Link to={`/programs/${program.id}`} >
              {program.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
