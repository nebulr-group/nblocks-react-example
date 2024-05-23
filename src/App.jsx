import React, { useState } from 'react';
import { NblocksProvider } from '@nebulr-group/nblocks-react';
import Sidebar from './partials/Sidebar';
import "./App.css";
import './charts/ChartjsConfig';

// Import pages
import AppRoutes from './Routes';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NblocksProvider config={{appId: ""}}>
      <div className="w-full flex h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="overflow-y-auto w-full flex justify-center nblocks-router">
          <AppRoutes />
        </div>
      </div>
    </NblocksProvider>
  );
}

export default App;