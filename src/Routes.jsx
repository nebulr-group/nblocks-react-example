import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import LoginComponent from "./nblocks/LoginComponent";
import LogoutComponent from "./nblocks/LogoutComponent";
import CallbackComponent from "./nblocks/CallbackComponent";
import ProtectedRoute from "./nblocks/ProtectedRoute";
import { UserList } from "./pages/UserList";
import { SelectPlan } from "./pages/SelectPlan";


function AppRoutes() {
  return (
    <Routes>
      

      <Route
        exact
        path="/auth/login"
        element={
          <LoginComponent />
        }
      />
      <Route
        exact
        path="/auth/oauth-callback"
        element={
          <CallbackComponent />
        }
      />
      <Route
        exact
        path="/auth/logout"
        element={
          <LogoutComponent />
        }
      />

      <Route path="*" element={
            <ProtectedRoute privileges={["AUTHENTICATED"]}>
              <Routes>
                <Route exact path="/dashboard" element={<Dashboard />}/>
                <Route exact path="/analytics" element={<Analytics />}/>
                <Route exact path="/user/list" element={<UserList />}/>
                <Route exact path="/selectPlan" element={<SelectPlan />}/>
                <Route path="*" element={<Navigate to="/dashboard" replace={true} />}/>
              </Routes>
            </ProtectedRoute>
          }
        />
    </Routes>
  );
}

export default AppRoutes;
