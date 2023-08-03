import { useEffect } from "react";

import { APPLICATION_ID } from "./Globals";
export default function LoginComponent() {

  const APP_ID = APPLICATION_ID
  useEffect(() => {
    // Immediately redirect the web browser to Nblocks login
    window.location.replace(`https://auth-stage.nblocks.cloud/url/login/${APP_ID}`);
  })

  return ("");
}


