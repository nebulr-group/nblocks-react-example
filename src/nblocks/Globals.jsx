const APP_ID = "";

if (!APP_ID) {
    alert("Set your APP_ID in src/nblocks/Globals.jsx first")
    throw new Error("Set your APP_ID in src/nblocks/Globals.jsx first")
}

const NBLOCKS_AUTH_URL = "https://auth-stage.nblocks.cloud";
const NBLOCKS_BACKENDLESS_URL = "https://backendless-stage.nblocks.cloud";

export {APP_ID, NBLOCKS_AUTH_URL, NBLOCKS_BACKENDLESS_URL}