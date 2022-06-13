import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { NewRep } from "../components/exportedComponents";

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
    <NewRep setId={setId} />
  ) : (
    <div>
      <p>{reps.length} Reps</p>
      <p>
        {reps[0].weight} {reps[0].weightSystem.toLowerCase()}
      </p>
    </div>
  );
}
