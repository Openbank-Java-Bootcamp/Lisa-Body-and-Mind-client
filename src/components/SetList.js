import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import SetDetails from "./SetDetails";
import { NoDataMessage } from "./exportedComponents";

export default function SetList({ exerciseId }) {
  const [sets, setSets] = useState(null);
  const [hasWorkouts, setHasWorkouts] = useState(true);

  const getSetsByExerciseId = () => {
    axios
      .get(`${API_URL}/api/sets/exercise/${exerciseId}`)
      .then((response) => setSets(response.data))
      .catch((error) => {
        console.log(error);
        setHasWorkouts(false);
      });
  };

  useEffect(() => {
    getSetsByExerciseId();
  }, []);

  return !hasWorkouts ? (
    <NoDataMessage parent="Exercise" child="Sets" />
  ) : sets === null || sets.length === 0 ? (
    <h1>Loading Sets...</h1>
  ) : (
    <div className="setList">
      <p>exercise sets: </p>
      <div className="cardContainer">
        {sets.map((set, i) => (
          <SetDetails set={set} index={i} key={set.id} />
        ))}
      </div>
    </div>
  );
}
