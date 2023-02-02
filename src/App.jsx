import React, { useEffect, useState } from 'react';
import {
  useLocation
} from 'react-router-dom';
import Sidebar from './partials/Sidebar';
import "./App.css";
import './charts/ChartjsConfig';

// Import pages
import AppRoutes from './Routes';

import { NblocksProvider } from "@nebulr-group/nblocks-react";

function App() {

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NblocksProvider config={{devMode: true, spa: false}}>
      <div className="w-full flex h-screen">
        {['/dashboard', '/analytics', '/user/list'].includes(location.pathname) && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className="overflow-y-auto w-full flex justify-center nblocks-router">
          <AppRoutes />
        </div>
      </div>
    </NblocksProvider>
  );
}

export default App;