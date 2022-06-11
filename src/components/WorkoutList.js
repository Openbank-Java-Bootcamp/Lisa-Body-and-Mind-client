import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function WorkoutList({ programId }) {
  const [workouts, setWorkouts] = useState(null);

  const getWorkoutsByProgramId = () => {
    axios
      .get(`${API_URL}/api/workouts/program/${programId}`)
      .then((response) => setWorkouts(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getWorkoutsByProgramId();
  }, []);

  return workouts === null || workouts.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <div className="workoutsList">
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
