import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function NewExercise({ workoutId }) {
  const [exerciseTypeList, setExerciseTypeList] = useState(null);
  const [exerciseTypeId, setExerciseTypeId] = useState(0);

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
    getAllExerciseTypes();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { exerciseTypeId, workoutId };

    axios
      // .post(`${API_URL}/api/workouts/new`, {
      //   headers: { Authorization: `Bearer ${storedToken}` }, requestBody
      // })
      .post(`${API_URL}/api/exercises/new`, requestBody)
      .then((response) => {
        setExerciseTypeId(0);
      })
      .catch((error) => console.error(error));

    refreshPage();
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
