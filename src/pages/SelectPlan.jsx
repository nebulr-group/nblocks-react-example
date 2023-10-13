import React, { useEffect } from "react";
import { APPLICATION_ID, NBLOCKS_AUTH, NBLOCKS_BACKENDLESS } from "../nblocks/Globals";

function SelectPlan() {
  const redirectToSelectPlan = async (accessToken) => {

    // Replace this with your own APP ID
    const APP_ID = APPLICATION_ID;

    // Make the API call to Nblocks
    const handoverCodeResult = await fetch(`${NBLOCKS_AUTH}/handover/code/${APP_ID}`,
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
      window.location.replace(`${NBLOCKS_BACKENDLESS}/subscription-portal/selectPlan?code=${handoverCodeResult.code}`); 
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