import React, { useEffect, useState } from "react";
import { decodeJwt } from "jose";
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({roles, privileges, redirectTo, children}) {

  // This will be our variable telling if the user is granted access or if we should redirect to login
  // Initially this variable is true since we don't want to redirect before resolving the 
  const [granted, setGranted] = useState(true);
  
  // This is the path which users without access should be redirect to
  const redirectPath = redirectTo ? redirectTo : "/auth/login";

  useEffect(() => {
    // Retrieve the access token JWT from localstorage
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
      const decoded = decodeJwt(accessToken);
      setGranted(hasRoleOrPrivilege(decoded));
    } else {
      setGranted(false);
    }
  }, []);

  // Helper method to see if the users token contains any of the required roles or privileges 
  const hasRoleOrPrivilege = (decoded) => {
    return roles ? roles.includes(decoded.role) : false || privileges ? privileges.some(scope => decoded.scope.includes(scope)) : false;
  }

  // Only if granted should we render the component children
  if (granted)
    return (children);
  else
    return (<Navigate to={redirectPath} replace />);
}
