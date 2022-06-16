import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { NoDataMessage } from "./exportedComponents";

export default function ExerciseList({ workoutId }) {
  const [exercises, setExercises] = useState(null);
  const [hasExercises, setHasExercises] = useState(true);

  const getExercisesByWorkoutId = () => {
    axios
      .get(`${API_URL}/api/exercises/workout/${workoutId}`)
      .then((response) => setExercises(response.data))
      .catch((error) => {
        console.log(error);
        setHasExercises(false);
      });
  };

  useEffect(() => {
    getExercisesByWorkoutId();
  }, []);

  return !hasExercises ? (
    <NoDataMessage parent="Workout" child="Exercises" />
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
