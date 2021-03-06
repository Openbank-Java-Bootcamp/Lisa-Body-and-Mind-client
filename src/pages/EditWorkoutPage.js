import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function EditWorkoutPage() {
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("USER");
  const [userId, setUserId] = useState(0);
  const [programId, setProgramId] = useState(0);
  const { workoutId } = useParams();
  const navigate = useNavigate();

  const getWorkoutById = () => {
    axios
      .get(`${API_URL}/api/workouts/${workoutId}`)
      .then((response) => {
        setName(response.data.name);
        setCreator(response.data.creator);
        setUserId(response.data.userId);
        setProgramId(response.data.program.id);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getWorkoutById();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, creator, userId, programId };

    axios
      //   .put(`${API_URL}/api/workouts/edit/${workoutId}`, requestBody, {
      //     headers: { Authorization: `Bearer ${storedToken}` },
      //   })
      .put(`${API_URL}/api/workouts/edit/${workoutId}`, requestBody)
      .then((response) => {
        setName("");
        setCreator("USER");
        setUserId(0);
        setProgramId(0);
        navigate(`/workouts/${workoutId}`);
      })
      .catch((error) => console.log(error));
  };

  return userId === 0 || programId === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <form onSubmit={handleSubmit} className="editWorkoutPage">
      <h2>Edit Workout</h2>
      <div className="group">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Program name</label>
      </div>
      <button type="submit" className="button buttonBlue">
        Update
        <div className="ripples buttonRipples">
          <span className="ripplesCircle"></span>
        </div>
      </button>
    </form>
  );
}
