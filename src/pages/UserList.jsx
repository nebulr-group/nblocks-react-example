import { useEffect, useState } from "react";
import { APPLICATION_ID, NBLOCKS_AUTH, NBLOCKS_BACKENDLESS } from "../nblocks/Globals";

function UserList() {
  const [handoverCode, setHandoverCode] = useState();

  // Replace this with your own APP ID
  const APP_ID = APPLICATION_ID;

  const getHandoverCode = async (accessToken) => {
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
      setHandoverCode(handoverCodeResult.code);
    }
  };

  useEffect(() => {
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken && !handoverCode) {
      getHandoverCode(accessToken);
    }
  }, [handoverCode]);

  const iframeSrc = `${NBLOCKS_BACKENDLESS}/user-management-portal/users?code=${handoverCode}`;

  return handoverCode ? (
    <iframe 
      src={iframeSrc}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
      }}
    >
    </iframe>
  ) : <div>Loading...</div>;

}

export { UserList }