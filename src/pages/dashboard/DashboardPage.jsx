// DashboardPage.jsx
import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import UserManagement from "../../components/dashboard/UserManagement";
import MenuManagement from "../../components/dashboard/MenuManagement";
import SubscriptionManagement from "../../components/dashboard/SubscriptionManagement";

function DashboardPage() {
  const [active, setActive] = useState("Dashboard");

  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />  
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {active === "Dashboard" && <h2>Dashboard Overview</h2>}
        {active === "Users" && <UserManagement />}
        {active === "Menu" && <MenuManagement />}
        {active === "Subscriptions" && <SubscriptionManagement />}
      </div>
    </div>
  );
}

export default DashboardPage;