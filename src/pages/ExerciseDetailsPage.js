import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { NewSet, SetList } from "../components/exportedComponents";
import { useAuth0 } from "@auth0/auth0-react";
import image1 from "../assets/asset1.png";
import image2 from "../assets/asset2.png";
import image3 from "../assets/asset-2.png";
import image4 from "../assets/asset-3.png";
import image5 from "../assets/asset-4.png";
import image6 from "../assets/asset-5.png";
import image7 from "../assets/asset-6.png";
import "../styles/ExerciseDetailsPage.css";

const images = [image1, image2, image3, image4, image5, image6, image7];

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
      .catch((error) => console.log(error));
  };

  const getUserIdByEmail = () => {
    axios
      .get(`${API_URL}/api/users/email/${user?.email}`)
      .then((response) => setUserId(response.data.id))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getExerciseById();
    getUserIdByEmail();
  }, []);

  const deleteExercise = () => {
    axios
      .delete(`${API_URL}/api/exercises/delete/${exerciseId}`)
      .then(() => navigate(`/workouts/${exercise?.workout.id}`))
      .catch((error) => console.log(error));
  };

  return exercise === null ? (
    <h1>Loading...</h1>
  ) : (
    <div className="exerciseDetails details">
      <div className="row">
        <>
          <img
            src={images[Math.floor(Math.random() * images.length)]}
            alt="Cat Exercising"
          />
        </>

        <div className="col">
          <h3>{exercise.exerciseType.name}</h3>

          {userId != null &&
            exercise.workout.userId === userId &&
            exercise.workout.creator != "TRAINER" && (
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
      <div className="cardContainer">
        <SetList exerciseId={exerciseId} />
      </div>
      {userId != null &&
        exercise.workout.userId === userId &&
        exercise.workout.creator != "TRAINER" && (
          <NewSet exerciseId={exerciseId} exerciseSessionId="null" />
        )}
    </div>
  );
}
