import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import SetDetails from "./SetDetails";

export default function SetList({ exerciseId }) {
  const [sets, setSets] = useState(null);
  const [hasWorkouts, setHasWorkouts] = useState(true);

  const getSetsByExerciseId = () => {
    axios
      .get(`${API_URL}/api/sets/exercise/${exerciseId}`)
      .then((response) => setSets(response.data))
      .catch((error) => {
        console.error(error);
        setHasWorkouts(false);
      });
  };

  useEffect(() => {
    getSetsByExerciseId();
  }, []);

  return !hasWorkouts ? (
    <h1>This Exercise has no Sets yet. Add some!</h1>
  ) : sets === null || sets.length === 0 ? (
    <h1>Loading Sets...</h1>
  ) : (
    <div className="setsList">
      <ul>
        {sets.map((set, i) => (
          <li key={set.id}>
            <SetDetails set={set} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
