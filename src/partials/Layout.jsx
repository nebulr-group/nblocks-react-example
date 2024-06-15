import React,  { useState }  from "react";
import Sidebar from './Sidebar';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="w-full flex h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="overflow-y-auto w-full flex justify-center nblocks-router">
            { children }
        </div>
    </div>
  );
}

export default Layout;
