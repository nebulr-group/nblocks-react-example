import React, { useEffect } from "react";
import { APP_ID, NBLOCKS_AUTH_URL, NBLOCKS_BACKENDLESS_URL } from "../nblocks/Globals";

function SelectPlan() {
  const redirectToSelectPlan = async (accessToken) => {

    // Make the API call to Nblocks
    const handoverCodeResult = await fetch(`${NBLOCKS_AUTH_URL}/handover/code/${APP_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
        }),
      }
    ).then(res => res.json());
    
    if(handoverCodeResult.code) {
      // Redirect to Nblocks Payments
      window.location.replace(`${NBLOCKS_BACKENDLESS_URL}/subscription-portal/selectPlan?code=${handoverCodeResult.code}`); 
    }
  };

  useEffect(() => {
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
      redirectToSelectPlan(accessToken);
    }
  }, [])

  return <div>Loading...</div>
}

export { SelectPlan }