import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function NewSet({ exerciseId, exerciseSessionId }) {
  //TODO add exerciseSessionId when created
  const [rest, setRest] = useState("00:00:00");
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  const refreshPage = () => {
    window.location.reload();
  };

  const restFormat = () => {
    let minutes = mins < 10 ? "0" + mins : mins;
    let seconds = secs < 10 ? "0" + secs : secs;

    setRest(`00:${minutes}:${seconds}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    restFormat();

    const requestBody = { rest, exerciseId, exerciseSessionId };

    axios
      // .post(`${API_URL}/api/sets/new`, {
      //   headers: { Authorization: `Bearer ${storedToken}` }, requestBody
      // })
      .post(`${API_URL}/api/sets/new`, requestBody)
      .then((response) => {
        setRest("00:00:00");
        setMins(0);
        setSecs(0);
      })
      .catch((error) => console.error(error));
    refreshPage();
  };

  return (
    <div className="newSet">
      <h3>New Program</h3>

      <form onSubmit={handleSubmit}>
        <label>Set Rest minutes</label>
        <input
          type="number"
          name="mins"
          value={mins}
          onChange={(e) => {
            setMins(e.target.value);
          }}
        />

        <label>Set Rest seconds</label>
        <input
          type="number"
          name="secs"
          value={secs}
          onChange={(e) => setSecs(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
