import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { ProgramList } from "../components/exportedComponents";
import { useAuth0 } from "@auth0/auth0-react";
import kettleball from "../assets/kettleball.png";
import dumbell from "../assets/dumbell.png";
import "../styles/ProgramsPage.css";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState(null);
  const [userPrograms, setUserPrograms] = useState(null);
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const getTrainerPrograms = () => {
    axios
      .get(`${API_URL}/api/programs/creator/trainer`)
      .then((response) => setPrograms(response.data))
      .catch((error) => console.error(error));
  };

  const getUserPrograms = () => {
    axios
      .get(`${API_URL}/api/users/email/${user?.email}`)
      .then((response) =>
        axios.get(`${API_URL}/api/programs/user/${response.data?.id}`)
      )
      .then((response) => setUserPrograms(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getTrainerPrograms();
    getUserPrograms();
    console.log(userPrograms !== null);
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return programs === null || programs.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <div className="programsPage">
      <div>
        <ProgramList programs={programs} />
        <img src={dumbell} alt="Dumbell" />
      </div>
      {userPrograms != null && (
        <div>
          <img src={kettleball} alt="Kettleball" />

          <ProgramList programs={userPrograms} />
        </div>
      )}
    </div>
  );
}
