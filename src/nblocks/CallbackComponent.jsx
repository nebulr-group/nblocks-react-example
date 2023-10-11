import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { jwtVerify, createRemoteJWKSet } from "jose";
import {APPLICATION_ID, NBLOCKS_AUTH } from "./Globals"; 

// Users will get back to this component after finishing login
export default function CallbackComponent() {

  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const code = urlSearch.get("code");

  // Replace this with your own APP ID
  const APP_ID = APPLICATION_ID;

  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    if (code) {
      handleCallback(code);
    }
  }, [code]);

  const handleCallback = async (code) => {
    // Make the API call to Nblocks
    const tokens = await fetch(`${NBLOCKS_AUTH}/token/code/${APP_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      }
    ).then(res => res.json());

    // Verify the result using public keys from Nblocks JWKS
    const { access_token, refresh_token, id_token } = tokens;
    const { payload } = await jwtVerify(
      access_token, createRemoteJWKSet(
          new URL(`${NBLOCKS_AUTH}/.well-known/jwks.json`)
      ), { issuer: NBLOCKS_AUTH }
    );

    // Store the result in component state and localstorage
    setAccessToken(payload);
    window.localStorage.setItem('access_token', access_token);
    window.localStorage.setItem('refresh_token', refresh_token);
    window.localStorage.setItem('id_token', id_token);
  };

  if (accessToken)
    if (accessToken.shouldSelectPlan || accessToken.shouldSetupPayments)
      return (<Navigate to={"/selectPlan"}/>);
    else
      return (<Navigate to={"/"}/>);
  else
    return (<p>Not logged in</p>);
}

