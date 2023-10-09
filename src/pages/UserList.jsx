import { useEffect, useState } from "react";
import { APPLICATION_ID, NBLOCKS_AUTH, NBLOCKS_BACKENDLESS } from "../nblocks/Globals";

// Users will get back to this component after finishing login
function UserList() {
  const [handoverCode, setHandoverCode] = useState();

  const getHandoverCode = async (accessToken) => {
    // Make the API call to Nblocks
    const handoverCodeResult = await fetch(`${NBLOCKS_AUTH}/handover/code/${APPLICATION_ID}`,
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
    setHandoverCode(handoverCodeResult.code);
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
  ) : <div></div>;

}

export { UserList }