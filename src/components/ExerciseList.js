import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function ExerciseList({ workoutId }) {
  const [exercises, setExercises] = useState(null);
  const [hasExercises, setHasExercises] = useState(true);

  const getExercisesByWorkoutId = () => {
    axios
      .get(`${API_URL}/api/exercises/workout/${workoutId}`)
      .then((response) => setExercises(response.data))
      .catch((error) => {
        console.error(error);
        setHasExercises(false);
      });
  };

  useEffect(() => {
    getExercisesByWorkoutId();
  }, []);

  return !hasExercises ? (
    <h1>This Workout has no Exercises yet. Add some!</h1>
  ) : exercises === null ? (
    <h1>Loading Exercises...</h1>
  ) : (
    <div className="exercisesList list">
      <p>exercises: </p>
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
