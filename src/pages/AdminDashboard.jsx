import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">
      <div className="sidebar">
        <h2>🏛️ Land Inspector Dashboard</h2>
        <button onClick={() => navigate("/verify-buyers")}>🧾 Verify Buyers</button>
        <button onClick={() => navigate("/verify-sellers")}>📋 Verify Sellers</button>
        <button onClick={() => navigate("/approve-transfers")}>✅ Approve Transfers</button>
        <button onClick={() => navigate("/my-profile")}>👤 My Profile</button>
      </div>

      <div className="admin-content">
        <h3>Welcome, {user?.name} 👋</h3>
        <p>Select an action from the sidebar to continue.</p>
      </div>
    </div>
  );
}
