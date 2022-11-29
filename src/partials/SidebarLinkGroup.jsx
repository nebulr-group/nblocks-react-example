import React, { useState } from 'react';

function SidebarLinkGroup({
  children,
  activecondition,
}) {

  return (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && 'bg-slate-900'}`}>
      {children}
    </li>
  );
}

export default SidebarLinkGroup;