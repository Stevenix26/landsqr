import React from "react";
import UserDetails from "@/app/dashboard/user/page";


const Dashboard = () => {
  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <section style={{ flex: 1, display: "flex" }}>
          <main style={{ flex: 1, padding: "1px" }}>
            {/* Dashboard content goes here */}
            <UserDetails />
          </main>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
