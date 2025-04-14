import React, { useEffect, useState } from "react";
import "../styles/OwnedLands.css";

const OwnedLands = () => {
  const [wallet, setWallet] = useState("");
  const [owned, setOwned] = useState([]);

  useEffect(() => {
    const fetchOwned = async () => {
      if (!window.ethereum) return alert("❌ MetaMask not found");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const currentWallet = accounts[0];
      setWallet(currentWallet);

      const allLands = JSON.parse(localStorage.getItem("lands")) || [];
      const filtered = allLands.filter(
        (land) =>
          land.status === "Paid" &&
          land.buyer === currentWallet
      );

      setOwned(filtered);
    };

    fetchOwned();
  }, []);

  return (
    <div className="owned-container">
      <h2>📄 Your Purchased Lands</h2>
      {owned.length === 0 ? (
        <p>No lands purchased yet.</p>
      ) : (
        owned.map((land, index) => (
          <div key={index} className="land-card">
            <p><strong>City:</strong> {land.city}</p>
            <p><strong>State:</strong> {land.state}</p>
            <p><strong>Price:</strong> {land.price} ETH</p>
            <p><strong>Status:</strong> ✅ {land.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OwnedLands;
