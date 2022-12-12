import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

import {
  NBAuthGuard,
  AuthRoutes,
  OnboardRoutes,
  SetupRoutes,
  UserRoutes,
  TenantRoutes,
  NBAccessControlGuard,
} from "@nebulr-group/nblocks-react";

function AppRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/dashboard"
        element={
          <NBAuthGuard>
            <Dashboard />
          </NBAuthGuard>
        }
      />

      <Route
        exact
        path="/analytics"
        element={
          <NBAccessControlGuard plans={['PREMIUM']}>
            <Analytics />
          </NBAccessControlGuard>
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
          <NBAuthGuard>
            <UserRoutes />
          </NBAuthGuard>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
