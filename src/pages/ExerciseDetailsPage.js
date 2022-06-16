import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { NewSet, SetList } from "../components/exportedComponents";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/ExerciseDetailsPage.css";

export default function ExerciseDetailsPage() {
  const [exercise, setExercise] = useState(null);
  const [userId, setUserId] = useState(null);
  const { exerciseId } = useParams();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const getExerciseById = () => {
    axios
      .get(`${API_URL}/api/exercises/${exerciseId}`)
      .then((response) => setExercise(response.data))
      .catch((error) => console.error(error));
  };

  const getUserIdByEmail = () => {
    axios
      .get(`${API_URL}/api/users/email/${user?.email}`)
      .then((response) => setUserId(response.data.id))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getExerciseById();
    getUserIdByEmail();
  }, []);

  const deleteExercise = () => {
    axios
      .delete(`${API_URL}/api/exercises/delete/${exerciseId}`)
      .then(() => navigate(`/workouts/${exercise?.workout.id}`))
      .catch((error) => console.error(error));
  };

  return exercise === null || userId === null ? (
    <h1>Loading...</h1>
  ) : (
    <div className="exerciseDetails details">
      <div className="row">
        <>
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
        </>

        <div className="col">
          <h3>{exercise.exerciseType.name}</h3>

          {exercise.workout.userId === userId && (
            <>
              <Link to={`/exercises/edit/${exerciseId}`}>
                <button className="buttonBox edit" role="button">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </Link>
              <button
                className="buttonBox delete"
                role="button"
                onClick={() => deleteExercise()}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </>
          )}
          <p>
            From <strong>{exercise.workout.name}</strong> Workout &{" "}
            <strong>{exercise.workout.program.name}</strong> Program
          </p>

          <p>
            Difficulty:{" "}
            <strong>{exercise.exerciseType.difficulty.toLowerCase()}</strong>
          </p>

          <p>
            Equipment: <strong>{exercise.exerciseType.equipment}</strong>
          </p>

          <p>
            Muscle: <strong>{exercise.exerciseType.muscle}</strong>
          </p>

          <p>
            Type: <strong>{exercise.exerciseType.type.toLowerCase()}</strong>
          </p>

          <p>
            <strong>Instructions:</strong> {exercise.exerciseType.instructions}
          </p>
        </div>
      </div>
      <div className="row">
        <SetList exerciseId={exerciseId} />
      </div>
      {exercise.workout.userId === userId && (
        <div className="row">
          <NewSet exerciseId={exerciseId} exerciseSessionId="null" />
        </div>
      )}
    </div>
  );
}
