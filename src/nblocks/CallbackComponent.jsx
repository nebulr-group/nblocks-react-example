import { useEffect, useState } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import {APPLICATION_ID } from "./Globals"; 

// Users will get back to this component after finishing login
export default function CallbackComponent() {

  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const code = urlSearch.get("code");

  const APP_ID = APPLICATION_ID;
  const [tokens, setTokens] = useState();

  useEffect(() => {
    if (code) {
      handleCallback(code);
    }
  }, [code]);

  const handleCallback = async (code) => {
    // Make the API call to Nblocks
    const result = await fetch(`https://auth-stage.nblocks.cloud/token/code/${APP_ID}`,
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

    // Store the result in component state and localstorage
    setTokens(result);
    window.localStorage.setItem('access_token', result.access_token);
  };

  if (tokens)
    return (<Navigate to={"/"}/>);
  else
    return (<p>Not logged in</p>);
}

