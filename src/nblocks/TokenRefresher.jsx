import React, { useEffect } from "react";
import {APP_ID, NBLOCKS_AUTH_URL } from "./Globals"; 
import { jwtVerify, decodeJwt, createRemoteJWKSet } from "jose";

export default function TokenRefresher() {

  const refreshTokens = async () => {
    const refreshToken = window.localStorage.getItem('refresh_token');
    if (refreshToken) {
      console.log("Refreshing tokens");
      const tokens = await fetch(`${NBLOCKS_AUTH_URL}/token/refresh/${APP_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: refreshToken,
          }),
        }
      ).then(res => res.json());
  
      // Verify the result using public keys from Nblocks JWKS
      const { access_token, refresh_token, id_token } = tokens;
      await jwtVerify(
        access_token, createRemoteJWKSet(
            new URL(`${NBLOCKS_AUTH_URL}/.well-known/jwks.json`)
        ), { issuer: NBLOCKS_AUTH_URL }
      );
  
      // Store the result in component state and localstorage
      window.localStorage.setItem('access_token', access_token);
      window.localStorage.setItem('refresh_token', refresh_token);
      window.localStorage.setItem('id_token', id_token);

      console.log(`Tokens refreshed, scheduling new refresh in ${tokens.expires_in} s`);
      setTimeout(refreshTokens, tokens.expires_in * 1000);
    } else {
      console.log(`Trying another refresh in ${60} s`);
      setTimeout(refreshTokens, 60 * 1000);
    }
  }

  const init = () => {
    const refreshToken = window.localStorage.getItem('refresh_token');
    if (refreshToken && new Date().getTime() > decodeJwt(refreshToken).exp * 1000 ){
      console.log('invalid refresh token');
      window.localStorage.removeItem('refresh_token');
    }

    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken && new Date().getTime() > decodeJwt(accessToken).exp * 1000 ){
      console.log('invalid access token');
      window.localStorage.removeItem('access_token');
    }
  }

  useEffect(() => {
    init();
    refreshTokens();
  }, []);

}
