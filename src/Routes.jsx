import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

import {
  AuthGuard,
  AuthRoutes,
  OnboardRoutes,
  SetupRoutes,
  UserRoutes,
  TenantRoutes,
  PlanAccessGuard,
} from "@nebulr-group/nblocks-react";

function AppRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/dashboard"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />

      <Route
        exact
        path="/analytics"
        element={
          <AuthGuard>
            {/* <PlanAccessGuard plans={['PREMIUM']}> */}
            <Analytics />
            {/* </PlanAccessGuard> */}
          </AuthGuard>
        }
      />

      {/* Nblocks standard routes */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/onboard/*" element={<OnboardRoutes />} />
      <Route path="/setup/*" element={<SetupRoutes />} />
      <Route path="/tenant/*" element={<TenantRoutes />} />
      <Route
        path="/user/*"
        element={
          <AuthGuard>
            <UserRoutes />
          </AuthGuard>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
