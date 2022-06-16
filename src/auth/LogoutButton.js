import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <button
      class="button-52 logout"
      role="button"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
}
