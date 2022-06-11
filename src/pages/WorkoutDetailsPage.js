import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { ExerciseList } from "../components/exportedComponents";

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

  return workout === null || workout.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <div className="workoutDetails">
      <h3>{workout.name}</h3>
      <p>
        From <strong>{workout.program.name}</strong> Program
      </p>

      {workout.creator === "TRAINER" && (
        <p>
          <strong>Created by:</strong>Body&Mind Trainers
        </p>
      )}
      {/* TODO when have auth, display created by (user name) or created by our trainers */}

      <ExerciseList workoutId={workoutId} />
    </div>
  );
}
