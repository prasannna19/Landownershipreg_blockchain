import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";

const VerifyBuyers = () => {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const buyerUsers = users.filter((user) => user.role === "buyer");
    setBuyers(buyerUsers);
  }, []);

  const handleVerify = (wallet) => {
    const updatedBuyers = buyers.map((buyer) =>
      buyer.wallet === wallet ? { ...buyer, isVerified: true } : buyer
    );
    setBuyers(updatedBuyers);

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedAllUsers = allUsers.map((user) =>
      user.wallet === wallet ? { ...user, isVerified: true } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedAllUsers));

    alert("✅ Buyer verified successfully!");
  };

  return (
    <div className="admin-dashboard">
      <h2>🧑‍💼 Verify Buyers</h2>
      {buyers.length === 0 ? (
        <p>No buyers found.</p>
      ) : (
        buyers.map((buyer, index) => (
          <div key={index} className="verify-card">
            <p><strong>Name:</strong> {buyer.name}</p>
            <p><strong>Email:</strong> {buyer.email}</p>
            <p><strong>Wallet:</strong> {buyer.wallet}</p>
            <p><strong>Status:</strong> {buyer.isVerified ? "✅ Verified" : "❌ Not Verified"}</p>
            {!buyer.isVerified && (
              <button onClick={() => handleVerify(buyer.wallet)}>✔️ Verify</button>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default VerifyBuyers;
