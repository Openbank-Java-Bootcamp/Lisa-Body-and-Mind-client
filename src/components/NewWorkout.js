import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { API_URL } from "../config";
import "../styles/form.css";

export default function NewWorkout({ programId }) {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);
  const [creator, setCreator] = useState("USER");
  const { user, isLoading } = useAuth0();

  const refreshPage = () => {
    window.location.reload();
  };

  const getUserIdByEmail = () => {
    axios
      // .get(`${API_URL}/api/users/email/${user?.email}`, {
      //   headers: { Authorization: `Bearer ${storedToken}` },
      // })
      .get(`${API_URL}/api/users/email/${user?.email}`)
      .then((response) => setUserId(response.data.id))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserIdByEmail();
  }, []);

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
        refreshPage();
      })
      .catch((error) => console.log(error));
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="newWorkout">
      <form onSubmit={handleSubmit}>
        <div className="group">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Workout name</label>
          <button type="submit" className="button buttonBlue">
            Add workout
            <div className="ripples buttonRipples">
              <span className="ripplesCircle"></span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
