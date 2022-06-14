import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { ExerciseList, NewExercise } from "../components/exportedComponents";

export default function WorkoutDetailsPage() {
  const [workout, setWorkout] = useState(null);
  const { workoutId } = useParams();

  const getWorkoutById = () => {
    axios
      .get(`${API_URL}/api/workouts/${workoutId}`)
      .then((response) => setWorkout(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getWorkoutById();
  }, []);

  return workout === null ? (
    <h1>Loading...</h1>
  ) : (
    <div className="workoutDetails">
      <h3>{workout.name}</h3>

      <p>
        From <strong>{workout.program.name}</strong>
      </p>

      {workout.creator === "TRAINER" && (
        <p>
          <strong>Created by:</strong>Body&Mind Trainers
        </p>
      )}
      {/* TODO when have auth, display created by (user name) or created by our trainers */}

      <ExerciseList workoutId={workoutId} />
      <NewExercise workoutId={workoutId} />
      <Link to={`/workouts/edit/${workoutId}`}>Edit Workout</Link>
    </div>
  );
}
