import { useEffect, useState } from 'react';
import { APPLICATION_ID, NBLOCKS_BACKENDLESS } from './Globals';
// The component takes the prop flag.
export default function FeatureFlag({ flag, children }) {

    // Replace this with your own APP ID
  const APP_ID = APPLICATION_ID;

  // This will be our variable telling if the feature is enabled or and we should render the component children
  // Initially this variable is false
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Evaluate the flag
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
      evaluate(accessToken);
    }
  }, []);

  const evaluate = async (accessToken) => {
    const result = await fetch(
      `${NBLOCKS_BACKENDLESS}/flags/evaluate/${APP_ID}/${flag}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
        }),
      }
    ).then((res) => res.json());
    setEnabled(result.enabled);
  };

  // Only if enabled should we render the component children
  if (enabled) return children;
  else return '';
}