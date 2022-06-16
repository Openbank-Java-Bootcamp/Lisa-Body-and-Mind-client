import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function EditProgramPage() {
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("USER");
  const [userId, setUserId] = useState(0);
  const { programId } = useParams();
  const navigate = useNavigate();

  const getProgramById = () => {
    axios
      .get(`${API_URL}/api/programs/${programId}`)
      .then((response) => {
        setName(response.data.name);
        setCreator(response.data.creator);
        setUserId(response.data.userId);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProgramById();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, creator, userId };

    axios
      //   .put(`${API_URL}/api/programs/edit/${programId}`, requestBody, {
      //     headers: { Authorization: `Bearer ${storedToken}` },
      //   })
      .put(`${API_URL}/api/programs/edit/${programId}`, requestBody)
      .then((response) => {
        setName("");
        setCreator("USER");
        setUserId(0);
        navigate(`/programs/${programId}`);
      });
  };

  // return name === "" ? (
  //   <h1>Loading...</h1>
  // ) :
  return (
    <form onSubmit={handleSubmit} className="editProgramPage">
      <h2>Edit Program</h2>
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
