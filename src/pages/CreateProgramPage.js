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
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUserIdByEmail();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, creator, userId };

    axios
      // .post(`${API_URL}/api/programs/new`, {
      //   headers: { Authorization: `Bearer ${storedToken}` }, requestBody
      // })
      .post(`${API_URL}/api/programs/new`, requestBody)
      .then((response) => {
        setName("");
        setUserId(0);
        setCreator("USER");
        refreshPage();
      })
      .catch((error) => console.error(error));
    navigate("/programs");
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="createProgram">
      <form onSubmit={handleSubmit}>
        <h2>New Program</h2>
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
          Create
          <div className="ripples buttonRipples">
            <span className="ripplesCircle"></span>
          </div>
        </button>
      </form>
    </div>
  );
}
