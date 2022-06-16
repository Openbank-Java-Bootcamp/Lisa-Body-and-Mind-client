import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../auth/exportedAuth";
import { NewUser } from "../components/exportedComponents";
import image from "../assets/body&mind2.png";
import image2 from "../assets/asset1.png";
import image3 from "../assets/asset2.png";
import "../styles/HomePage.css";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div className="homePage">
      <NewUser />
      <ul>
        <li>
          <Link to="/programs">
            <img src={image2} alt="Woman Doing a Yoga Pose" />
            My
            <br />
            Programs
          </Link>
        </li>
        <li className="newProgramLi">
          <Link to="/programs/new">
            New
            <br />
            Program
            <img src={image3} alt="Woman Doing a Yoga Pose" />
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <div className="loggedOutHomePage">
      <h1>Body&Mind</h1>
      <img src={image} alt="Woman Doing a Yoga Pose" />
      {/* <p>Please Log In</p>
      <LoginButton /> */}
      <p>
        <i>Take care of your mind taking care of your body.</i>
      </p>
    </div>
  );
}
