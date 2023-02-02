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
import { Todos } from './pages/Todos';

function App() {

  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NblocksProvider config={{devMode: true}}>
      <Todos />
    </NblocksProvider>
  );
}

export default App;