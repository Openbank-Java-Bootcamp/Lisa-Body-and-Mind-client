import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { ExerciseList, NewExercise } from "../components/exportedComponents";
import { useAuth0 } from "@auth0/auth0-react";

export default function WorkoutDetailsPage() {
  const [workout, setWorkout] = useState(null);
  const [userId, setUserId] = useState(null);
  const { workoutId } = useParams();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const getWorkoutById = () => {
    axios
      .get(`${API_URL}/api/workouts/${workoutId}`)
      .then((response) => setWorkout(response.data))
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
    getWorkoutById();
    getUserIdByEmail();
  }, []);

  const deleteWorkout = () => {
    axios
      .delete(`${API_URL}/api/workouts/delete/${workoutId}`)
      .then(() => navigate(`/programs/${workout?.program.id}`))
      .catch((error) => console.error(error));
  };

  return workout === null || userId === null ? (
    <h1>Loading...</h1>
  ) : (
    <div className="workoutDetails details">
      <h3>
        {workout.name}{" "}
        {workout.userId === userId && (
          <>
            <Link to={`/workouts/edit/${workoutId}`}>
              <button className="buttonBox edit" role="button">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </Link>
            <button
              className="buttonBox delete"
              role="button"
              onClick={() => deleteWorkout()}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </>
        )}
      </h3>

      <p>
        From <strong>{workout.program.name}</strong>
      </p>

      {workout.creator === "TRAINER" && (
        <p>
          <strong>Created by:</strong>Body&Mind Trainers
        </p>
      )}

      <ExerciseList workoutId={workoutId} />

      {workout.userId === userId && <NewExercise workoutId={workoutId} />}
    </div>
  );
}
