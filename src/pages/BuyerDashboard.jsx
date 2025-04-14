import React from "react";
import { Link } from "react-router-dom";
import "../styles/BuyerDashboard.css";

const BuyerDashboard = () => {
  return (
    <div className="buyer-dashboard-container">
      <div className="sidebar">
        <h2>🏠 Buyer Dashboard</h2>
        <ul>
          <li><Link to="/view-lands">🌍 View Lands</Link></li>
          <li><Link to="/owned-lands">📄 Owned Lands</Link></li>
          <li><Link to="/payment-receipts">🧾 View Receipts</Link></li>
          <li><Link to="/make-payment">💳 Make Payment</Link></li>
          <li><Link to="/transfer-ownership">🔄 Transfer Ownership</Link></li>
          <li><Link to="/my-profile">👤 My Profile</Link></li>
          <li><Link to="/help">❓ Help</Link></li>
        </ul>
      </div>
      <div className="content">
        <h3>Welcome to your Buyer Dashboard!</h3>
        <p>Select an option from the sidebar to get started.</p>
      </div>
    </div>
  );
};

export default BuyerDashboard;
