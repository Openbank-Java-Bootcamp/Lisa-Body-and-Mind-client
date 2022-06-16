import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <button
      className="buttonBox logout"
      role="button"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
}
