import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function WorkoutList({ programId }) {
  const [workouts, setWorkouts] = useState(null);
  const [hasWorkouts, setHasWorkouts] = useState(true);

  const getWorkoutsByProgramId = () => {
    axios
      .get(`${API_URL}/api/workouts/program/${programId}`)
      .then((response) => setWorkouts(response.data))
      .catch((error) => {
        console.error(error);
        setHasWorkouts(false);
      });
  };

  useEffect(() => {
    getWorkoutsByProgramId();
  }, []);

  return !hasWorkouts ? (
    <h1>This Program has no Wrokouts yet. Add some!</h1>
  ) : workouts === null || workouts.length === 0 ? (
    <h1>Loading Workouts...</h1>
  ) : (
    <div className="workoutsList list">
      <p>workouts: </p>
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
