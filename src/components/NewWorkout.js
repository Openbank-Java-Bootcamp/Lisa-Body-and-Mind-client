import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { API_URL } from "../config";

export default function NewWorkout({ programId }) {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);
  const [creator, setCreator] = useState("USER");
  const { user, isLoading } = useAuth0();

  const getUserIdByEmail = () => {
    axios
      // .get(`${API_URL}/api/users/email/${user?.email}`, {
      //   headers: { Authorization: `Bearer ${storedToken}` },
      // })
      .get(`${API_URL}/api/users/email/${user?.email}`)
      .then((response) => setUserId(response.data.id))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUserIdByEmail();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, creator, userId, programId };

    axios
      // .post(`${API_URL}/api/workouts/new`, {
      //   headers: { Authorization: `Bearer ${storedToken}` }, requestBody
      // })
      .post(`${API_URL}/api/workouts/new`, requestBody)
      .then((response) => {
        setName("");
        setUserId(0);
        setCreator("USER");
      })
      .catch((error) => console.error(error));

    refreshPage();
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="newWorkout">
      <form onSubmit={handleSubmit}>
        <label>Workout Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
