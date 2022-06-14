import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { NewSet, SetList } from "../components/exportedComponents";

export default function ExerciseDetailsPage() {
  const [exercise, setExercise] = useState(null);
  const { exerciseId } = useParams();

  const getExerciseById = () => {
    axios
      .get(`${API_URL}/api/exercises/${exerciseId}`)
      .then((response) => setExercise(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getExerciseById();
  }, []);

  return exercise === null ? (
    <h1>Loading...</h1>
  ) : (
    <div className="exerciseDetails">
      {exercise.exerciseType.image !== "" ? (
        <img
          src={exercise.exerciseType.image}
          alt={exercise.exerciseType.name}
        />
      ) : (
        <img
          src="https://media.istockphoto.com/photos/cat-exercising-on-bench-press-picture-id1207832240?k=20&m=1207832240&s=612x612&w=0&h=PmkB7TGeBfHvBvljPmDozS4X0zP5P2pRiwKOX6vqTLg="
          alt="Cat Exercising"
        />
      )}

      <h3>{exercise.exerciseType.name}</h3>

      <p>
        From <strong>{exercise.workout.program.name}</strong> Program
      </p>

      {exercise.exerciseType.creator === "TRAINER" && (
        <p>
          <strong>Created by:</strong>Body&Mind Trainers
        </p>
      )}
      {/* TODO when have auth, display created by (user name) or created by our trainers */}

      <p>Difficulty: {exercise.exerciseType.difficulty.toLowerCase()}</p>

      <p>Equipment: {exercise.exerciseType.equipment}</p>

      <p>Muscle: {exercise.exerciseType.muscle}</p>

      <p>Type: {exercise.exerciseType.type.toLowerCase()}</p>

      <p>Instructions: {exercise.exerciseType.instructions}</p>

      <SetList exerciseId={exerciseId} />
      <NewSet exerciseId={exerciseId} exerciseSessionId="null" />
      <Link to={`/exercises/edit/${exerciseId}`}>Edit Exercise</Link>
    </div>
  );
}
