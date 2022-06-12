import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { ProgramList } from "../components/exportedComponents";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState(null);
  const [storedToken, setStoredToken] = useState(null);

  //TODO when have security: only show programs TRAINER and USER (with user Id === logged user)
  const { getAccessTokenSilently } = useAuth0();

  getAccessTokenSilently().then((result) => setStoredToken(result));

  const getAllPrograms = () => {
    axios
      .get(`${API_URL}/api/programs`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setPrograms(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllPrograms();
  }, []);

  return programs === null || programs.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <ProgramList programs={programs} />
  );
}
