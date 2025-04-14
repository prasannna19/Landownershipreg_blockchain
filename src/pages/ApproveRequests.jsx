import React, { useEffect, useState } from "react";
import "../styles/SellerDashboard.css";

const ApproveRequests = () => {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const storedLands = JSON.parse(localStorage.getItem("lands")) || [];
    setLands(storedLands);
  }, []);

  const handleApprove = async (landId) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const wallet = accounts[0];

      await window.ethereum.request({
        method: "personal_sign",
        params: ["✅ Approve this land request", wallet],
      });

      const updated = lands.map((land) =>
        land.id === landId
          ? { ...land, requestStatus: "Approved" }
          : land
      );

      localStorage.setItem("lands", JSON.stringify(updated));
      setLands(updated);
      alert("✅ Request approved!");
    } catch (err) {
      alert("❌ Approval cancelled or failed.");
    }
  };

  const pending = lands.filter((land) => land.requestStatus === "Pending");

  return (
    <div className="seller-dashboard">
      <h2>📥 Approve Land Requests</h2>
      {pending.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        pending.map((land) => (
          <div key={land.id} className="land-card">
            <p><strong>City:</strong> {land.city}</p>
            <p><strong>State:</strong> {land.state}</p>
            <p><strong>Price:</strong> {land.price} ETH</p>
            <p><strong>Buyer Wallet:</strong> {land.buyer}</p>
            <button onClick={() => handleApprove(land.id)}>✅ Approve</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ApproveRequests;
