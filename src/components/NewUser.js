import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { API_URL } from "../config";

export default function NewUser() {
  const [email, setEmail] = useState("");
  const [isUserInDB, setIsUserInDB] = useState(true);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [fullName, setFullName] = useState("");
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    verifyUserInDBByEmail();
    setEmail(user?.email);
  }, []);

  useEffect(() => {
    verifyUserInDBByEmail();
  }, [isUserInDB]);

  const verifyUserInDBByEmail = () => {
    axios
      // .get(`${API_URL}/api/users/verify-email/${user.email}`, {
      //   headers: { Authorization: `Bearer ${storedToken}` },
      // })
      .get(`${API_URL}/api/users/verify-email/${user?.email}`)
      .then((response) => setIsUserInDB(response.data))
      .catch((error) => console.log(error));
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, username, image, fullName };

    axios
      .post(`${API_URL}/api/users/new`, requestBody)
      .then((response) => {
        setEmail("");
        setUsername("");
        setImage("");
        setFullName("");
        setIsUserInDB(false);
        refreshPage();
      })
      .catch((error) => console.log(error));
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    !isUserInDB && (
      <div className="newUser">
        <form onSubmit={handleSubmit}>
          <h2>Please add your following details to create custom programs </h2>
          <div className="group">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Username</label>
          </div>

          <div className="group">
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Full name</label>
          </div>

          <div className="group">
            <input
              type="text"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Image</label>
          </div>
          <button type="submit" className="button buttonBlue">
            Add user details
            <div className="ripples buttonRipples">
              <span className="ripplesCircle"></span>
            </div>
          </button>
        </form>
      </div>
    )
  );
}
