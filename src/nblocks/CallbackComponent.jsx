import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { jwtVerify, createRemoteJWKSet } from "jose";
import {APPLICATION_ID, NBLOCKS_AUTH } from "./Globals"; 

// Users will get back to this component after finishing login
export default function CallbackComponent() {

  // Replace this with your own APP ID
  const APP_ID = APPLICATION_ID;

  const location = useLocation();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (code) {
      handleCallback(code);
    }
  }, []);

  const handleCallback = async (code) => {
    // Get tokens
    const tokens = await fetch(`${NBLOCKS_AUTH}/token/code/${APP_ID}`,
      {
        method: "POST", headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ code }),
      }
    ).then(res => res.json());

    // Verify the tokens result using public keys from Nblocks JWKS
    const { access_token, refresh_token, id_token } = tokens;
    const { payload } = await jwtVerify(
      access_token, createRemoteJWKSet(
          new URL(`${NBLOCKS_AUTH}/.well-known/jwks.json`)
      ), { issuer: NBLOCKS_AUTH }
    );

    // Store the result in component state and localstorage
    window.localStorage.setItem('access_token', access_token);
    window.localStorage.setItem('refresh_token', refresh_token);
    window.localStorage.setItem('id_token', id_token);
    setAccessToken(payload);
    console.log("User access token", payload);
  };

  if (accessToken)
      return (<Navigate to={"/"}/>);
  else
    return (<p>Not logged in</p>);
}

