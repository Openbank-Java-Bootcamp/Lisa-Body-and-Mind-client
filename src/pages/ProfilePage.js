import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { API_URL } from "../config";
import { NewUser } from "../components/exportedComponents";
import "../styles/ProfilePage.css";
import image1 from "../assets/asset1.png";
import image2 from "../assets/asset2.png";
import image3 from "../assets/asset-1.png";
import image4 from "../assets/asset-2.png";
import image5 from "../assets/asset-3.png";
import image6 from "../assets/asset-4.png";
import image7 from "../assets/asset-5.png";
import image8 from "../assets/asset-6.png";

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

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
      .catch((error) => console.log(error));
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return userDetails !== null ? (
    <div className="profilePage">
      <div className="card">
        <img
          src={images[Math.floor(Math.random() * images.length)]}
          alt={user.email}
        />
        <h2>{userDetails.fullName}</h2>
        <p className="title">
          username: <strong>{userDetails.username}</strong>
        </p>
        <p>
          email: <strong>{userDetails.email}</strong>
        </p>
        <button>Edit</button>
      </div>
    </div>
  ) : (
    <NewUser />
  );
}
