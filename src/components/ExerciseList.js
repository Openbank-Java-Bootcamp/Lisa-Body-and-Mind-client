import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function ExerciseList({ workoutId }) {
  const [exercises, setExercises] = useState(null);

  const getExercisesByWorkoutId = () => {
    axios
      .get(`${API_URL}/api/exercises/workout/${workoutId}`)
      .then((response) => setExercises(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getExercisesByWorkoutId();
  }, []);

  return exercises === null ? (
    <h1>Loading Exercises...</h1>
  ) : (
    <div className="exercisesList">
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <Link to={`/exercises/${exercise.id}`}>
              {exercise.exerciseType.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
