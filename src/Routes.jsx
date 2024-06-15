import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Layout from "./partials/Layout";

function AppRoutes() {
  
  return (
    <Routes>
      <Route path="*" element={
        <Layout>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />}/>
            <Route exact path="/analytics" element={<Analytics />}/>
            <Route path="*" element={<Navigate to="/dashboard" replace={true} />}/>
          </Routes>
        </Layout>
      }
      />
    </Routes>
  );
}

export default AppRoutes;
