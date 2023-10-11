import React, { useEffect } from "react";
import { APPLICATION_ID, NBLOCKS_AUTH } from "./Globals";

export default function LogoutComponent() {

  // Replace this with your own APP ID
  const APP_ID = APPLICATION_ID;

  useEffect(() => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('id_token');

    // Immediately redirect the web browser to Nblocks login
    window.location.replace(`/`);
  })

  return ("");
}


