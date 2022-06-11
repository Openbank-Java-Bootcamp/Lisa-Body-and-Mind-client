import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function RepDetails({ setId }) {
  const [reps, setReps] = useState(null);

  const getRepsBySetId = () => {
    axios
      .get(`${API_URL}/api/repetitions/set/${setId}`)
      .then((response) => setReps(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getRepsBySetId();
  }, []);

  return reps === null || reps.length === 0 ? (
    <p>No reps added to this Set</p>
  ) : (
    <div>
      <p>{reps.length} Reps</p>
      <p>
        {reps[0].weight} {reps[0].weightSystem.toLowerCase()}
      </p>
    </div>
  );
}
