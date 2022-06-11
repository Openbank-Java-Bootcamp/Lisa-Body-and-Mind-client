import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState(null);

  //TODO when have security: only show programs TRAINER and USER (with user Id === logged user)

  const getAllPrograms = () => {
    axios
      .get(`${API_URL}/api/programs`)
      .then((response) => setPrograms(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllPrograms();
  }, []);

  programs === null && <h1>Loading...</h1>;

  return programs === null ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      ProgramsPage
      <p>{programs[0].name}</p>
      <p>{programs[1].name}</p>
    </div>
  );
}
