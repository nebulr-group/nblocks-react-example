import React, { useEffect } from "react";

export default function LogoutComponent() {

  useEffect(() => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('id_token');

    // Immediately redirect the web browser to Nblocks login
    window.location.replace(`/`);
  })

  return ("");
}


