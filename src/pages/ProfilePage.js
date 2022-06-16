import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { API_URL } from "../config";
import { NewUser } from "../components/exportedComponents";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getUserDetailsByEmail();
  }, []);

  const getUserDetailsByEmail = () => {
    axios
      .get(`${API_URL}/api/users/email/${user?.email}`)
      .then((response) => setUserDetails(response.data))
      .catch((error) => console.error(error));
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return userDetails !== null ? (
    <div className="profilePage">
      <div className="card">
        <img
          src={userDetails.image}
          alt={user.email}
          style={{ width: "25%" }}
        />
        <h2>{userDetails.fullName}</h2>
        <p className="title">username: <strong>{userDetails.username}</strong></p>
        <p>email: <strong>{userDetails.email}</strong></p>
        <button>Edit</button>
      </div>
    </div>
  ) : (
    <NewUser />
  );
}
