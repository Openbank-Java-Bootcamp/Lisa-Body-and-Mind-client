import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function NewRep({ setId }) {
  const [repNumber, setRepNumber] = useState(0);
  const [weight, setWeight] = useState(0);
  const [weightSystem, setWeightSystem] = useState("");

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { weight, weightSystem, setId };

    if (repNumber > 0) {
      for (let index = 0; index < repNumber; index++) {
        axios
          // .post(`${API_URL}/api/repetitions/new`, {
          //   headers: { Authorization: `Bearer ${storedToken}` }, requestBody
          // })
          .post(`${API_URL}/api/repetitions/new`, requestBody)
          .then((response) => {
            setRepNumber(0);
            setWeight(0);
            setWeightSystem("");
          })
          .catch((error) => console.error(error));
      }
    }

    refreshPage();
  };

  return (
    <div className="newRep">
      <form onSubmit={handleSubmit}>
        <label>Number of reps:</label>
        <input
          type="number"
          name="repNumber"
          value={repNumber}
          onChange={(e) => {
            setRepNumber(e.target.value);
          }}
        />

        <label>Weight:</label>
        <input
          type="number"
          name="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <select
          name="weightSystem"
          value={weightSystem}
          onChange={(e) => setWeightSystem(e.target.value)}
        >
          <option hidden defaultValue>
            Select weight system
          </option>
          <option value={"KG"}>kg</option>
          <option value={"LBS"}>lbs</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
