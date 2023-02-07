import React from 'react';
import "./App.css";
import './charts/ChartjsConfig';
import Dashboard from "./pages/Dashboard";

import { NblocksProvider } from "@nebulr-group/nblocks-react";

function App() {
  return (
    <NblocksProvider config={{devMode: true}}>
      <div className="w-full flex h-screen">
        <div className="overflow-y-auto w-full flex justify-center nblocks-router">
          <Dashboard />
        </div>
      </div>
    </NblocksProvider>
  );
}

export default App;