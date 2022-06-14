import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { RepDetails } from "../components/exportedComponents";

export default function SetDetails({ set, index }) {
  return set === null ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <p>
        <strong>Set {index + 1}</strong>
      </p>
      <p>Rest: {set.rest.slice(3)} mins</p>

      <RepDetails setId={set.id} />
      <Link to={`/sets/edit/${set.id}`}>Edit Workout</Link>
    </div>
  );
}
