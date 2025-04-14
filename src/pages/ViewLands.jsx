import React, { useEffect, useState } from "react";
import "../styles/ViewLands.css";

const ViewLands = () => {
  const [wallet, setWallet] = useState("");
  const [allLands, setAllLands] = useState([]);

  useEffect(() => {
    const fetchWalletAndLands = async () => {
      if (!window.ethereum) {
        alert("❌ MetaMask not found");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWallet(accounts[0]);

      const lands = JSON.parse(localStorage.getItem("lands")) || [];
      setAllLands(lands);
    };

    fetchWalletAndLands();
  }, []);

  const handleRequest = (landId) => {
    const updated = allLands.map((land) => {
      if (land.id === landId) {
        return {
          ...land,
          requestStatus: "Pending",
          buyer: wallet,
        };
      }
      return land;
    });

    localStorage.setItem("lands", JSON.stringify(updated));
    setAllLands(updated);
  };

  const handleCancel = (landId) => {
    const updated = allLands.map((land) => {
      if (land.id === landId && land.buyer === wallet) {
        return {
          ...land,
          requestStatus: null,
          buyer: null,
        };
      }
      return land;
    });

    localStorage.setItem("lands", JSON.stringify(updated));
    setAllLands(updated);
  };

  return (
    <div className="view-lands-container">
      <h2>🌍 Browse Lands</h2>

      {allLands.length === 0 ? (
        <p>No lands available.</p>
      ) : (
        allLands.map((land) => (
          <div key={land.id} className="land-card">
            <h3>{land.area || "Land"}</h3>
            <p>📍 <strong>Location:</strong> {land.city || "N/A"}</p>
            <p>💰 <strong>Price:</strong> {land.price || "N/A"} ETH</p>
            <p>👤 <strong>Owner:</strong> {land.owner || "N/A"}</p>

            {land.requestStatus === "Pending" && land.buyer === wallet ? (
              <>
                <button className="pending-btn">⏳ Request Pending</button>
                <button className="cancel-btn" onClick={() => handleCancel(land.id)}>
                  🗑️ Cancel Request
                </button>
              </>
            ) : (
              <button className="request-btn" onClick={() => handleRequest(land.id)}>
                📥 Request Land
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewLands;
