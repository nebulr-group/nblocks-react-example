import { useEffect } from "react";

import { APPLICATION_ID, NBLOCKS_AUTH } from "./Globals";
export default function LoginComponent() {

  const APP_ID = APPLICATION_ID
  useEffect(() => {
    // Immediately redirect the web browser to Nblocks login
    window.location.replace(`${NBLOCKS_AUTH}/url/login/${APP_ID}`);
  })

  return ("");
}


