import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function NewExercise({ workoutId }) {
  const [exerciseTypeList, setExerciseTypeList] = useState(null);
  const [exerciseTypeId, setExerciseTypeId] = useState(0);

  const getAllExerciseTypes = () => {
    axios
      .get(`${API_URL}/api/exercise-types`)
      .then((response) => setExerciseTypeList(response.data))
      .catch((error) => console.log(error));
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
      .post(`${API_URL}/api/exercises/new`, requestBody)
      .then((response) => {
        setExerciseTypeId(0);
        refreshPage();
      })
      .catch((error) => console.log(error));
  };

  return exerciseTypeList === null || exerciseTypeList.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <form onSubmit={handleSubmit} className="newExercise">
      <div className="group">
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
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Exercise name</label>
      </div>
      <button type="submit" className="button buttonBlue">
        Add exercise
        <div className="ripples buttonRipples">
          <span className="ripplesCircle"></span>
        </div>
      </button>
    </form>
  );
}
