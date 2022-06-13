import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { API_URL } from "../config";

export default function CreateProgramPage() {
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("USER");
  const [userId, setUserId] = useState(0);
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();

  // if ROLES then check logged users role if TRAINER change creator to such

  const getUserId = () => {
    axios
      .get(`${API_URL}/api/users/email/${user?.email}`)
      .then((response) => setUserId(response.data.id))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUserId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, creator, userId };

    axios
      .post(`${API_URL}/api/programs/new`, requestBody)
      .then((response) => {
        setName("");
        setUserId(0);
        setCreator("USER");
      })
      .catch((error) => console.error(error));
    navigate("/programs");
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="createProgram">
      <h3>New Program</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="hidden"
          name="userId"
          value={userId}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
