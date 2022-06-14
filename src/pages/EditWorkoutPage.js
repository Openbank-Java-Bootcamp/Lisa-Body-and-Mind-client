import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function EditWorkoutPage() {
  const [name, setName] = useState("");
  const { workoutId } = useParams();
  const navigate = useNavigate();

  //   TODO edit name in exercise session too

  const getWorkoutById = () => {
    axios
      .get(`${API_URL}/api/workouts/${workoutId}`)
      .then((response) => setName(response.data.name))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getWorkoutById();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name };

    axios
      //   .put(`${API_URL}/api/workouts/edit/${workoutId}`, requestBody, {
      //     headers: { Authorization: `Bearer ${storedToken}` },
      //   })
      .put(`${API_URL}/api/workouts/edit/${workoutId}`, requestBody)
      .then((response) => {
        setName("");
        navigate(`/workouts/${workoutId}`);
      });
  };

  return name === "" ? (
    <h1>Loading...</h1>
  ) : (
    <div className="editWorkoutPage">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Update Workout</button>
      </form>
    </div>
  );
}
