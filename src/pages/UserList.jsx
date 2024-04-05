import { useEffect, useState } from "react";
import { APP_ID, NBLOCKS_AUTH_URL, NBLOCKS_BACKENDLESS_URL } from "../nblocks/Globals";

function UserList() {
  const [handoverCode, setHandoverCode] = useState();

  const getHandoverCode = async (accessToken) => {
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
      setHandoverCode(handoverCodeResult.code);
    }
  };

  useEffect(() => {
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken && !handoverCode) {
      getHandoverCode(accessToken);
    }
  }, [handoverCode]);

  const iframeSrc = `${NBLOCKS_BACKENDLESS_URL}/user-management-portal/users?code=${handoverCode}`;

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