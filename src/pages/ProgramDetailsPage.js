import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { WorkoutList, NewWorkout } from "../components/exportedComponents";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/DetailsPageWithList.css";

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
      .catch((error) => console.log(error));
  };

  const getUserIdByEmail = () => {
    axios
      // .get(`${API_URL}/api/users/email/${user?.email}`, {
      //   headers: { Authorization: `Bearer ${storedToken}` },
      // })
      .get(`${API_URL}/api/users/email/${user?.email}`)
      .then((response) => setUserId(response.data.id))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProgramById();
    getUserIdByEmail();
  }, []);

  const deleteProgram = () => {
    axios
      .delete(`${API_URL}/api/programs/delete/${programId}`)
      .then(() => navigate("/programs"))
      .catch((error) => console.log(error));
  };

  return program === null ? (
    <h1>Loading...</h1>
  ) : (
    <div className="programDetails details">
      <h3>
        {program.name}{" "}
        {program.userId === userId && program.creator !== "TRAINER" && (
          <>
            <Link to={`/programs/edit/${program.id}`}>
              <button className="buttonBox edit" role="button">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </Link>
            <button
              className="buttonBox delete"
              role="button"
              onClick={() => deleteProgram()}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </>
        )}
      </h3>

      {program.creator === "TRAINER" && (
        <p>
          <strong>Created by:</strong>Body&Mind Trainers
        </p>
      )}

      <WorkoutList programId={program.id} />

      {userId === null &&
        program.userId === userId &&
        program.creator !== "TRAINER" && <NewWorkout programId={program.id} />}
    </div>
  );
}
