import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function EditExercisePage() {
  const [workoutId, setWorkoutId] = useState(0);
  const [exerciseTypeId, setExerciseTypeId] = useState(0);
  const [exerciseTypeList, setExerciseTypeList] = useState(null);
  const { exerciseId } = useParams();
  const navigate = useNavigate();

  //   TODO edit name in exercise session too

  const getExerciseById = () => {
    axios
      .get(`${API_URL}/api/exercises/${exerciseId}`)
      .then((response) => {
        setWorkoutId(response.data.workoutId);
        setExerciseTypeId(response.data.exerciseTypeId);
      })
      .catch((error) => console.error(error));
  };

  const getAllExerciseTypes = () => {
    axios
      // .get(`${API_URL}/api/exercise-types`, {
      //   headers: { Authorization: `Bearer ${storedToken}` },
      // })
      .get(`${API_URL}/api/exercise-types`)
      .then((response) => setExerciseTypeList(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getExerciseById();
    getAllExerciseTypes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { workoutId, exerciseTypeId };

    axios
      //   .put(`${API_URL}/api/exercises/edit/${exerciseId}`, requestBody, {
      //     headers: { Authorization: `Bearer ${storedToken}` },
      //   })
      .put(`${API_URL}/api/exercises/edit/${exerciseId}`, requestBody)
      .then((response) => {
        setWorkoutId(0);
        setExerciseTypeId(0);
        navigate(`/exercises/${exerciseId}`);
      });
  };

  return exerciseTypeList === null || exerciseTypeList.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <div className="newExercise">
      <form onSubmit={handleSubmit}>
        <label>Select exercise type:</label>
        <select
          name="exerciseTypeId"
          value={exerciseTypeId}
          onChange={(e) => setExerciseTypeId(e.target.value)}
        >
          <option hidden defaultValue>
            Select one...
          </option>
          {exerciseTypeList.map((exerciseType) => (
            <option value={exerciseType.id} key={exerciseType.id}>
              {exerciseType.name}
            </option>
          ))}
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
