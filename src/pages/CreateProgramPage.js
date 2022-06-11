import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function CreateProgramPage() {
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("USER");
  const [userId, setUserId] = useState(0);
  // TODO add logged userId to the created program when have auth
  // if ROLES then check logged users role if TRAINER change creator to such

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
  };

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
