import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { WorkoutList, NewWorkout } from "../components/exportedComponents";

export default function ProgramDetailsPage() {
  const [program, setProgram] = useState(null);
  const { programId } = useParams();

  const getProgramById = () => {
    axios
      .get(`${API_URL}/api/programs/${programId}`)
      .then((response) => setProgram(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProgramById();
  }, []);

  return program === null ? (
    <h1>Loading...</h1>
  ) : (
    <div className="programDetails">
      <h3>{program.name}</h3>

      {program.creator === "TRAINER" && (
        <p>
          <strong>Created by:</strong>Body&Mind Trainers
        </p>
      )}
      {/* TODO when have auth, display created by (user name) or created by our trainers */}

      <WorkoutList programId={programId} />
      <NewWorkout programId={programId} />

      <Link to={`/programs/edit/${programId}`}>Edit Program</Link>
    </div>
  );
}
