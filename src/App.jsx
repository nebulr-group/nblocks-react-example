import React from 'react';
import { NblocksProvider } from '@nebulr-group/nblocks-react';
import "./App.css";
import './charts/ChartjsConfig';

// Import pages
import AppRoutes from './Routes';

function App() {

  return (
    <NblocksProvider config={{appId: ""}}>
      <AppRoutes />
    </NblocksProvider>
  );
}

export default App;