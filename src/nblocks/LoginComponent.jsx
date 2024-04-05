import React, { useEffect } from "react";

import { APP_ID, NBLOCKS_AUTH_URL } from "./Globals";
export default function LoginComponent() {

  useEffect(() => {
    // Immediately redirect the web browser to Nblocks login
    window.location.replace(`${NBLOCKS_AUTH_URL}/url/login/${APP_ID}`);
  })

  return ("Logging in...");
}


