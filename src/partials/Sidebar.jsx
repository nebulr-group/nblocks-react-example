import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { decodeJwt } from 'jose';
import SidebarLinkGroup from "./SidebarLinkGroup";
import FeatureFlag from "../nblocks/FeatureFlags";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();  

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [trial, setTrial] = useState(false);

  useEffect(() => {
    const idToken = window.localStorage.getItem('id_token');
    if (idToken) {
      setName(decodeJwt(idToken).name);
    }
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
      const {plan, trial} = decodeJwt(accessToken);
      setPlan(plan);
      setTrial(trial);
    }
  })

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src="https://public.nblocks.dev/assets/logos/nblocks-logo-black-text.png"></img>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* The clickable dashboard button */}
              <DashboardButton active={location.pathname === "/" || location.pathname.includes("dashboard")} />            
              <AnalyticsButton active={location.pathname.includes("analytics")} />            
              <UserListButton active={location.pathname.includes("user/list")} />
              <SubscriptionButton active={false}/>
            </ul>
          </div>
        </div>

        <div className="justify-end mt-auto">
          <div>
            <ul className="mt-3">
              <div className="px-3">
                <div>
                  {name}
                </div>
                <div>
                  Plan: {plan} {trial ? "(trial)" : ""}
                </div>
                <FeatureFlag flag={"my-flag"}>
                  <span>Feature on</span>
                </FeatureFlag>
              </div>
              <SidebarLinkGroup>
                <Link
                  to="/auth/logout"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Logout
                      </span>
                    </div>
                  </div>
                </Link>
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardButton = ({active}) => {
  return (
    <SidebarLinkGroup
      activecondition={
        active
      }
    >
      <Link
        to="/dashboard"
        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
          active &&
          "hover:text-slate-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
              <path
                className={`fill-current text-slate-400 ${
                  active &&
                  "!text-indigo-500"
                }`}
                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
              />
              <path
                className={`fill-current text-slate-600 ${
                  active &&
                  "text-indigo-600"
                }`}
                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
              />
              <path
                className={`fill-current text-slate-400 ${
                  active &&
                  "text-indigo-200"
                }`}
                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
              />
            </svg>
            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
              Dashboard
            </span>
          </div>
        </div>
      </Link>
    </SidebarLinkGroup>
  );
};

const AnalyticsButton = ({active}) => {
  return (
    <SidebarLinkGroup activecondition={active}>
      <Link
        to="/analytics"
        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
          active && "hover:text-slate-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
              <path
                className={`fill-current text-slate-600 ${
                  active && "text-indigo-500"
                }`}
                d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
              />
              <path
                className={`fill-current text-slate-400 ${
                  active && "text-indigo-300"
                }`}
                d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
              />
              <path
                className={`fill-current text-slate-600 ${
                  active && "text-indigo-500"
                }`}
                d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
              />
              <path
                className={`fill-current text-slate-400 ${
                  active && "text-indigo-300"
                }`}
                d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
              />
            </svg>
            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
              Analytics
            </span>
          </div>
        </div>
      </Link>
    </SidebarLinkGroup>
  );
};

const UserListButton = ({active}) => {
  return (
    <SidebarLinkGroup activecondition={active}>
      <Link
        to="/user/list"
        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
          active && "hover:text-slate-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
              <path
                className={`fill-current text-slate-600 ${active && 'text-indigo-500'}`}
                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
              />
              <path
                className={`fill-current text-slate-400 ${active && 'text-indigo-300'}`}
                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
              />
            </svg>
            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
              Users
            </span>
          </div>
        </div>
      </Link>
    </SidebarLinkGroup>
  );
};

const SubscriptionButton = ({active}) => {
  return (
    <SidebarLinkGroup activecondition={false}>
      <Link
        to="/selectPlan"
        className={`block text-slate-200 hover:text-white truncate transition duration-150`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
              <path
                className={`fill-current text-slate-600 ${active && 'text-indigo-500'}`}
                d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
              />
              <path
                className={`fill-current text-slate-400 ${active && 'text-indigo-300'}`}
                d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
              />
            </svg>
            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
              Subscription
            </span>
          </div>
        </div>
      </Link>
    </SidebarLinkGroup>
  );
};

export default Sidebar;
