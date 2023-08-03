import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/dashboard"
        element={          
            <Dashboard />          
        }
      />

      <Route
        exact
        path="/analytics"
        element={
            <Analytics />
        }
      />
            
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
