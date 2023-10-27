import React, { useEffect, useState } from 'react';
import {
  useLocation
} from 'react-router-dom';
import Sidebar from './partials/Sidebar';
import "./App.css";
import './charts/ChartjsConfig';
import TokenRefresher from './nblocks/TokenRefresher';

// Import pages
import AppRoutes from './Routes';

function App() {

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <div className="w-full flex h-screen">
        <TokenRefresher/>
        {['/dashboard', '/analytics', '/user/list'].includes(location.pathname) && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className="overflow-y-auto w-full flex justify-center nblocks-router">
          <AppRoutes />
        </div>
      </div>    
  );
}

export default App;