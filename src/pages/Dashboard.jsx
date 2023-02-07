import React from "react";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import ExampleHeading from "../components/ExampleHeading";
import UserListButton from "../components/UserListButton";
import NotificationForm from "../components/NotificationForm";
// import '../css/style.css';

function Dashboard() {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Welcome banner */}
          <WelcomeBanner />
          <ExampleHeading className={"text-2xl"} />
          <UserListButton>List Tenant Users</UserListButton>
          <NotificationForm />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
