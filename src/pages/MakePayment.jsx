import React, { useEffect, useState } from "react";
import "../styles/MakePayment.css";

const MakePayment = () => {
  const [wallet, setWallet] = useState("");
  const [acceptedLands, setAcceptedLands] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || !user.wallet) {
      alert("❌ Buyer not found. Please register and connect wallet.");
      return;
    }

    setWallet(user.wallet);

    const allLands = JSON.parse(localStorage.getItem("lands")) || [];
    const filtered = allLands.filter(
      (land) =>
        land.requestStatus === "Approved" &&
        land.buyer === user.wallet &&
        land.status !== "Paid"
    );

    setAcceptedLands(filtered);
  }, []);

  const handlePay = async (landId, price, seller) => {
    if (!seller || !price) {
      alert("❌ Seller address or price is missing.");
      return;
    }

    const confirmPay = prompt("Type 'pay' to confirm the payment");
    if (confirmPay !== "pay") return alert("❌ Payment cancelled");

    try {
      const res = await fetch("http://localhost:5000/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seller, price }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Payment successful!");

        const allLands = JSON.parse(localStorage.getItem("lands")) || [];
        const updatedLands = allLands.map((land) => {
          if (land.id === landId) {
            return { ...land, status: "Paid" };
          }
          return land;
        });

        localStorage.setItem("lands", JSON.stringify(updatedLands));

        const receipt = {
          txHash: data.txHash,
          amount: price,
          seller,
          buyer: wallet,
          date: new Date().toLocaleString(),
        };

        const oldReceipts = JSON.parse(localStorage.getItem("receipts")) || [];
        oldReceipts.push(receipt);
        localStorage.setItem("receipts", JSON.stringify(oldReceipts));

        const stillUnpaid = updatedLands.filter(
          (land) =>
            land.requestStatus === "Approved" &&
            land.buyer === wallet &&
            land.status !== "Paid"
        );
        setAcceptedLands(stillUnpaid);
      } else {
        alert("❌ Payment failed: " + data.error);
      }
    } catch (error) {
      console.error("❌ Payment error:", error);
      alert("❌ Payment failed or network error.");
    }
  };

  return (
    <div className="payment-container">
      <h2>💳 Make Payment for Approved Lands</h2>

      {acceptedLands.length === 0 ? (
        <p>No approved land requests available for payment.</p>
      ) : (
        acceptedLands.map((land) => (
          <div key={land.id} className="land-card">
            <h3>🏞️ {land.area || "Land"}</h3>
            <p>📍 Location: {land.city || "N/A"}, {land.state || "N/A"}</p>
            <p>💰 Price: {land.price || "N/A"} ETH</p>
            <p>👤 Seller: {land.owner || "N/A"}</p>
            <button onClick={() => handlePay(land.id, land.price, land.owner)}>
              💰 Pay Now
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MakePayment;
