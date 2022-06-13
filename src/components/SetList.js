import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import SetDetails from "./SetDetails";

export default function SetList({ exerciseId }) {
  const [sets, setSets] = useState(null);

  const getSetsByExerciseId = () => {
    axios
      .get(`${API_URL}/api/sets/exercise/${exerciseId}`)
      .then((response) => setSets(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getSetsByExerciseId();
  }, []);

  return sets === null || sets.length === 0 ? (
    <h1>Loading Sets...</h1>
  ) : (
    <div className="setsList">
      <ul>
        {sets.map((set, i) => (
          <li key={set.id}>
            <SetDetails set={set} index={i} />
            {/* <Link to={`/sets/${set.id}`}>Set {i + 1}</Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
