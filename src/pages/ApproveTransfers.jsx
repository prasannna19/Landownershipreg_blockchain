import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";

const ApproveTransfers = () => {
  const [pendingTransfers, setPendingTransfers] = useState([]);
  const [approvedTransfers, setApprovedTransfers] = useState([]);

  useEffect(() => {
    const allLands = JSON.parse(localStorage.getItem("lands")) || [];

    const pending = allLands.filter(
      (land) => land.status === "Paid" && !land.transferApproved
    );

    const approved = allLands.filter(
      (land) => land.status === "Paid" && land.transferApproved
    );

    setPendingTransfers(pending);
    setApprovedTransfers(approved);
  }, []);

  const handleApprove = (landId) => {
    const allLands = JSON.parse(localStorage.getItem("lands")) || [];

    const updatedLands = allLands.map((land) =>
      land.id === landId ? { ...land, transferApproved: true } : land
    );

    localStorage.setItem("lands", JSON.stringify(updatedLands));

    const newPending = updatedLands.filter(
      (land) => land.status === "Paid" && !land.transferApproved
    );
    const newApproved = updatedLands.filter(
      (land) => land.status === "Paid" && land.transferApproved
    );

    setPendingTransfers(newPending);
    setApprovedTransfers(newApproved);

    alert("✅ Ownership transfer approved!");
  };

  return (
    <div className="admin-subpage">
      <h2>🔄 Approve Ownership Transfers</h2>

      {/* Pending Transfers Section */}
      <h3>⏳ Pending Transfers</h3>
      {pendingTransfers.length === 0 ? (
        <p>No pending transfers found.</p>
      ) : (
        pendingTransfers.map((land) => (
          <div key={land.id} className="land-card">
            <h3>🏞️ {land.area || "Land"}</h3>
            <p>📍 Location: {land.city}, {land.state}</p>
            <p>💰 Price: {land.price} ETH</p>
            <p>👤 Buyer: {land.buyer}</p>
            <button onClick={() => handleApprove(land.id)}>✅ Approve Transfer</button>
          </div>
        ))
      )}

      {/* Approved Transfers Section */}
      <h3>✅ Approved Transfers (Past)</h3>
      {approvedTransfers.length === 0 ? (
        <p>No approved transfers yet.</p>
      ) : (
        approvedTransfers.map((land) => (
          <div key={land.id} className="land-card approved">
            <h3>🏞️ {land.area || "Land"}</h3>
            <p>📍 Location: {land.city}, {land.state}</p>
            <p>💰 Price: {land.price} ETH</p>
            <p>👤 Buyer: {land.buyer}</p>
            <p>🧾 Transfer Approved ✅</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ApproveTransfers;
