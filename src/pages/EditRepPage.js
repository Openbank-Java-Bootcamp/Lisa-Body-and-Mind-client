import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

export default function EditRepPage() {
  const [repNumber, setRepNumber] = useState(0);
  const [weight, setWeight] = useState(0);
  const [weightSystem, setWeightSystem] = useState("");
  const [reps, setReps] = useState(null);
  const { setId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="editRep">
      <h3>Edit Rep:</h3>

      <form onSubmit={handleSubmit}>
        <button type="submit">Update Rep</button>
      </form>
    </div>
  );
}
