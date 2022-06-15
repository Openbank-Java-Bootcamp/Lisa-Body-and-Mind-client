import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { RepDetails } from "../components/exportedComponents";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

export default function SetDetails({ set, index }) {
  const [userId, setUserId] = useState(null);
  const { user } = useAuth0();

  const refreshPage = () => {
    window.location.reload();
  };

  const getUserIdByEmail = () => {
    axios
      // .get(`${API_URL}/api/users/email/${user?.email}`, {
      //   headers: { Authorization: `Bearer ${storedToken}` },
      // })
      .get(`${API_URL}/api/users/email/${user?.email}`)
      .then((response) => setUserId(response.data.id))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUserIdByEmail();
  }, []);

  const deleteSet = () => {
    axios
      .delete(`${API_URL}/api/sets/delete/${set.id}`)
      .then(() => refreshPage())
      .catch((error) => console.error(error));
  };

  return set === null ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <p>
        <strong>Set {index + 1}</strong>
      </p>
      {set.exercise.workout.userId === userId && (
        <>
          <Link to={`/sets/edit/${set.id}`}>Edit Set</Link>
          <Button onClick={() => deleteSet()}>Delete Set</Button>
        </>
      )}
      <p>Rest: {set.rest.slice(3)} mins</p>

      <RepDetails set={set} />
    </div>
  );
}
