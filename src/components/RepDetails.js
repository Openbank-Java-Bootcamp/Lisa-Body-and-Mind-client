import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { NewRep } from "../components/exportedComponents";
import { NoDataMessage } from "./exportedComponents";

export default function RepDetails({ set, index }) {
  const [reps, setReps] = useState(null);
  const [hasReps, setHasReps] = useState(true);
  const [repsCreatedByUser, setRepsCreatedByUser] = useState(true);

  const refreshPage = () => {
    window.location.reload();
  };

  const areRepsCreatedByUser = (repetitions) => {
    const arr = repetitions.filter(
      (rep) => rep.set.exercise.workout.creator === "USER"
    );

    setRepsCreatedByUser(arr.length > 0 ? true : false);
  };

  const getRepsBySetId = () => {
    axios
      .get(`${API_URL}/api/repetitions/set/${set.id}`)
      .then((response) => {
        setReps(response.data);
        areRepsCreatedByUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setHasReps(false);
      });
  };

  useEffect(() => {
    getRepsBySetId();
  }, []);

  const deleteRep = () => {
    axios
      .delete(`${API_URL}/api/repetitions/delete/set/${set.id}`)
      .then(() => refreshPage())
      .catch((error) => console.log(error));
  };

  return !hasReps ? (
    <>
      <NoDataMessage parent="Set" child="Reps" />
      {set.exercise.workout.creator === "USER" && (
        <NewRep set={set} index={index} />
      )}
    </>
  ) : reps === null ? (
    <h1>Loading Reps...</h1>
  ) : (
    <div>
      <p>
        {repsCreatedByUser && <button onClick={() => deleteRep()}>x</button>}{" "}
        {reps.length} Reps
      </p>

      <p>
        {reps[0].weight} {reps[0].weightSystem.toLowerCase()}
      </p>
    </div>
  );
}
