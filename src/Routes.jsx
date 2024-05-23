import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { 
  LoginComponent, 
  LogoutComponent, 
  CallbackComponent,
  ProtectedRouteComponent,
  SubscriptionComponent,
  TeamComponent
} from '@nebulr-group/nblocks-react';
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginComponent />}/>
      <Route exact path="/logout" element={<LogoutComponent />}/>
      <Route exact path="/auth/oauth-callback" element={<CallbackComponent />}/>
      <Route path="*" element={
        <ProtectedRouteComponent>
          <Routes>
            <Route exact path="/team" element={<TeamComponent />}/>
            <Route exact path="/subscription" element={<SubscriptionComponent />}/>
            <Route exact path="/dashboard" element={<Dashboard />}/>
            <Route exact path="/analytics" element={<Analytics />}/>
            <Route path="*" element={<Navigate to="/dashboard" replace={true} />}/>
          </Routes>
        </ProtectedRouteComponent>
        }
        />
    </Routes>
  );
}

export default AppRoutes;
