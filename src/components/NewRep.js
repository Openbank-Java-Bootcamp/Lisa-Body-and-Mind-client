import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function NewRep({ set, index }) {
  const [repNumber, setRepNumber] = useState(0);
  const [weight, setWeight] = useState(0);
  const [weightSystem, setWeightSystem] = useState("");

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const setId = set?.id;
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
            refreshPage();
          })
          .catch((error) => console.error(error));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newRep">
      <h2>New Reps for Set {index}</h2>
      <div className="group">
        <input
          type="number"
          name="repNumber"
          value={repNumber}
          onChange={(e) => {
            setRepNumber(e.target.value);
          }}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Number of reps</label>
      </div>

      <div className="group">
        <input
          type="number"
          name="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Weight</label>
      </div>

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
      <button type="submit" className="button buttonBlue">
        Add reps
        <div className="ripples buttonRipples">
          <span className="ripplesCircle"></span>
        </div>
      </button>
    </form>
  );
}
