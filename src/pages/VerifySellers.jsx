import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";

const VerifySellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const sellerUsers = users.filter((user) => user.role === "seller");
    setSellers(sellerUsers);
  }, []);

  const handleVerify = (wallet) => {
    const updatedSellers = sellers.map((seller) =>
      seller.wallet === wallet ? { ...seller, isVerified: true } : seller
    );
    setSellers(updatedSellers);

    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedAllUsers = allUsers.map((user) =>
      user.wallet === wallet ? { ...user, isVerified: true } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedAllUsers));

    alert("✅ Seller verified successfully!");
  };

  return (
    <div className="admin-dashboard">
      <h2>🏠 Verify Sellers</h2>
      {sellers.length === 0 ? (
        <p>No sellers found.</p>
      ) : (
        sellers.map((seller, index) => (
          <div key={index} className="verify-card">
            <p><strong>Name:</strong> {seller.name}</p>
            <p><strong>Email:</strong> {seller.email}</p>
            <p><strong>Wallet:</strong> {seller.wallet}</p>
            <p><strong>Status:</strong> {seller.isVerified ? "✅ Verified" : "❌ Not Verified"}</p>
            {!seller.isVerified && (
              <button onClick={() => handleVerify(seller.wallet)}>✔️ Verify</button>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default VerifySellers;
