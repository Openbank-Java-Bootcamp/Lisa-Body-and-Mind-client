import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  getAccessTokenSilently().then((result) => console.log(result));
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div className="profilePage">
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>User Metadata</h3>
    </div>
  ) : (
    <h1>Please authenticate</h1>
  );
}
