import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

export default function EditSetPage() {
  const [rest, setRest] = useState("00:00:00");
  const [exerciseId, setExerciseId] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const { setId } = useParams();
  const navigate = useNavigate();

  const restFormat = (m, s) => {
    const minutes = m < 10 ? "0" + m : m;
    const seconds = s < 10 ? "0" + s : s;
    setRest(`00:${minutes}:${seconds}`);
  };

  const restToMinsSecs = (restTime) => {
    let restARR = restTime.split(":");
    setMins(parseInt(restARR[1]));
    setSecs(parseInt(restARR[2]));
  };

  const getSetsById = () => {
    axios
      .get(`${API_URL}/api/sets/${setId}`)
      .then((response) => {
        setRest(response.data.rest);
        restToMinsSecs(response.data.rest);
        setExerciseId(response.data.exercise.id);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSetsById();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const exerciseSessionId = "null";

    const requestBody = { rest, exerciseId, exerciseSessionId };
    axios
      // .put(`${API_URL}/api/sets/edit/${setId}`, {
      //   headers: { Authorization: `Bearer ${storedToken}` }, requestBody
      // })
      .put(`${API_URL}/api/sets/edit/${setId}`, requestBody)
      .then((response) => {
        setRest("00:00:00");
        setMins(0);
        setSecs(0);
        setExerciseId(0);
        navigate(`/exercises/${exerciseId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit} className="editSet">
      <h2>Edit Set:</h2>
      <div className="group">
        <input
          type="number"
          name="mins"
          value={mins}
          onChange={(e) => {
            setMins(e.target.value);
            restFormat(e.target.value, secs);
          }}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Rest minutes</label>
      </div>

      <div className="group">
        <input
          type="number"
          name="secs"
          value={secs}
          onChange={(e) => {
            setSecs(e.target.value);
            restFormat(mins, e.target.value);
          }}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Rest seconds</label>
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
