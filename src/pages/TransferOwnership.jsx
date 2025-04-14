import React, { useEffect, useState } from "react";
import "../styles/MakePayment.css";

const TransferOwnership = () => {
  const [wallet, setWallet] = useState("");
  const [transferableLands, setTransferableLands] = useState([]);
  const [transferredLands, setTransferredLands] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || !user.wallet) {
      alert("❌ User not found. Please register and connect wallet.");
      return;
    }

    setWallet(user.wallet);

    const allLands = JSON.parse(localStorage.getItem("lands")) || [];
    const eligible = allLands.filter(
      (land) =>
        land.buyer === user.wallet &&
        land.status === "Paid" &&
        land.transferApproved &&
        !land.transferredTo
    );
    setTransferableLands(eligible);

    const transferred = allLands.filter(
      (land) => land.transferredTo && land.buyer === user.wallet
    );
    setTransferredLands(transferred);
  }, []);

  const isValidAddress = (addr) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  const handleTransfer = (landId) => {
    const recipient = prompt("Enter wallet address to transfer ownership:");
    if (!recipient || !isValidAddress(recipient)) {
      alert("❌ Enter a valid wallet address.");
      return;
    }

    const allLands = JSON.parse(localStorage.getItem("lands")) || [];
    const updated = allLands.map((land) =>
      land.id === landId ? { ...land, transferredTo: recipient } : land
    );
    localStorage.setItem("lands", JSON.stringify(updated));

    alert("✅ Ownership transferred successfully!");

    const newTransferable = updated.filter(
      (land) =>
        land.buyer === wallet &&
        land.status === "Paid" &&
        land.transferApproved &&
        !land.transferredTo
    );
    setTransferableLands(newTransferable);

    const newTransferred = updated.filter(
      (land) => land.transferredTo && land.buyer === wallet
    );
    setTransferredLands(newTransferred);
  };

  return (
    <div className="payment-container">
      <h2>🔄 Transfer Land Ownership</h2>

      {transferableLands.length === 0 ? (
        <p>No lands available for transfer.</p>
      ) : (
        <>
          <h3>Available to Transfer</h3>
          {transferableLands.map((land) => (
            <div key={land.id} className="land-card">
              <p><strong>🏞️ Area:</strong> {land.area}</p>
              <p><strong>📍 Location:</strong> {land.city}, {land.state}</p>
              <p><strong>💰 Price:</strong> {land.price} ETH</p>
              <button onClick={() => handleTransfer(land.id)}>
                🔄 Transfer Ownership
              </button>
            </div>
          ))}
        </>
      )}

      {transferredLands.length > 0 && (
        <>
          <h3 style={{ marginTop: "30px" }}>📜 Past Transfers</h3>
          {transferredLands.map((land, idx) => (
            <div key={idx} className="land-card">
              <p><strong>🏞️ Area:</strong> {land.area}</p>
              <p><strong>📍 Location:</strong> {land.city}, {land.state}</p>
              <p><strong>💰 Price:</strong> {land.price} ETH</p>
              <p><strong>✅ Transferred To:</strong> {land.transferredTo}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TransferOwnership;
