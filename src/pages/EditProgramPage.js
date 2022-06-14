import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function EditProgramPage() {
  const [name, setName] = useState("");
  const { programId } = useParams();
  const navigate = useNavigate();

  //   TODO edit name in exercise session too

  const getProgramById = () => {
    axios
      .get(`${API_URL}/api/programs/${programId}`)
      .then((response) => setName(response.data.name))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProgramById();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name };

    axios
      //   .put(`${API_URL}/api/programs/edit/${programId}`, requestBody, {
      //     headers: { Authorization: `Bearer ${storedToken}` },
      //   })
      .put(`${API_URL}/api/programs/edit/${programId}`, requestBody)
      .then((response) => {
        setName("");
        navigate(`/programs/${programId}`);
      });
  };

  return name === "" ? (
    <h1>Loading...</h1>
  ) : (
    <div className="editProgramPage">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
}
