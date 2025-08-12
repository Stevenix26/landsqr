import React from "react";
import UserDetails from "@/app/dashboard/userDetails/page";


const Dashboard = () => {
  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <section style={{ flex: 1, display: "flex" }}>
          <main style={{ flex: 2, padding: "1rem" }}>
            {/* Dashboard content goes here */}
            <UserDetails />
          </main>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
