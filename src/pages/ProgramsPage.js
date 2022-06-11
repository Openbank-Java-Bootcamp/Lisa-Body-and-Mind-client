import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { ProgramList } from "../components/exportedComponents";

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

  return programs === null || programs.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <ProgramList programs={programs} />
  );
}
