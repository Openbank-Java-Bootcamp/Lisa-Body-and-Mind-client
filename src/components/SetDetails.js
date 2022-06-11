import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function SetDetails({ set, index }) {
  const [reps, setReps] = useState(null);

  const getRepsBySetId = () => {
    axios
      .get(`${API_URL}/api/repetitions/set/${set.id}`)
      .then((response) => setReps(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getRepsBySetId();
  }, []);

  return reps === null || reps.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <p>
        <strong>Set {index + 1}</strong>
      </p>
      <p>Rest: {set.rest.slice(3)} mins</p>
      <p>{reps.length} Reps</p>
      <p>
        {reps[0].weight} {reps[0].weightSystem.toLowerCase()}
      </p>
    </div>
  );
}
