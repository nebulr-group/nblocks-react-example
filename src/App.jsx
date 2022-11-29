import React, { useEffect, useState } from 'react';
import {
  useLocation
} from 'react-router-dom';
import Sidebar from './partials/Sidebar';

import './charts/ChartjsConfig';

// Import pages
import AppRoutes from './Routes';

import { NblocksProvider } from "@nebulr-group/nblocks-react";

function App() {

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NblocksProvider config={{signup: true}}>
      <div className="flex h-screen overflow-hidden justify-center">
        {['/dashboard', '/analytics'].includes(location.pathname) && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <AppRoutes />
      </div>
    </NblocksProvider>
  );
}

export default App;
