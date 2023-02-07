import React from "react";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import ExampleHeading from "../components/ExampleHeading";
import UserListButton from "../components/UserListButton";
import NotificationForm from "../components/NotificationForm";
import { NBAccessControlComponent } from "@nebulr-group/nblocks-react";

function Dashboard() {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Welcome banner */}
          <WelcomeBanner />
          <NBAccessControlComponent plans={["PREMIUM"]}>
            <ExampleHeading className={"text-2xl"} />
          </NBAccessControlComponent>

          <NBAccessControlComponent roles={["OWNER"]}>
            <UserListButton>List Tenant Users</UserListButton>
          </NBAccessControlComponent>

          <NBAccessControlComponent
            roles={["TENANT_ADMIN", "OWNER"]}
            plans={["PREMIUM"]}
          >
            <NotificationForm />
          </NBAccessControlComponent>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
