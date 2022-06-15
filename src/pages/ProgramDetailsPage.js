import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { WorkoutList, NewWorkout } from "../components/exportedComponents";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

export default function ProgramDetailsPage() {
  const [program, setProgram] = useState(null);
  const [userId, setUserId] = useState(null);
  const { programId } = useParams();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const getProgramById = () => {
    axios
      .get(`${API_URL}/api/programs/${programId}`)
      .then((response) => setProgram(response.data))
      .catch((error) => console.error(error));
  };

  const getUserIdByEmail = () => {
    axios
      // .get(`${API_URL}/api/users/email/${user?.email}`, {
      //   headers: { Authorization: `Bearer ${storedToken}` },
      // })
      .get(`${API_URL}/api/users/email/${user?.email}`)
      .then((response) => setUserId(response.data.id))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProgramById();
    getUserIdByEmail();
  }, []);

  const deleteProgram = () => {
    axios
    .delete(`${API_URL}/api/programs/delete/${programId}`)
    .then(() => navigate("/programs"))
    .catch((error) => console.error(error)); 
  }

  return program === null || userId === null ? (
    <h1>Loading...</h1>
  ) : (
    <div className="programDetails">
      <h3>{program.name}</h3>

      {program.userId === userId && (
        <>
          <Link to={`/programs/edit/${program.id}`}>Edit Program</Link>
          <Button onClick={() => deleteProgram()}>Delete Program</Button>
        </>
      )}

      {program.creator === "TRAINER" && (
        <p>
          <strong>Created by:</strong>Body&Mind Trainers
        </p>
      )}

      <WorkoutList programId={program.id} />

      {program.userId === userId && <NewWorkout programId={program.id} />}
    </div>
  );
}
