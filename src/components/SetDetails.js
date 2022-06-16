import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { RepDetails } from "../components/exportedComponents";
import { useAuth0 } from "@auth0/auth0-react";

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
    <div className="setDetails">
      <p>
        <strong>
          Set {index + 1}{" "}
          {set.exercise.workout.userId === userId && (
            <>
              <Link to={`/sets/edit/${set.id}`}>
                <button className="buttonBox edit" role="button">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </Link>
              <button
                className="buttonBox delete"
                role="button"
                onClick={() => deleteSet()}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </>
          )}
        </strong>
      </p>

      <p>Rest: {set.rest.slice(3)} mins</p>

      <RepDetails set={set} index={index + 1} />
    </div>
  );
}
