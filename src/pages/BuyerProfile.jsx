import React, { useEffect, useState } from "react";
import "../styles/UserProfile.css";

const BuyerProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }
  }, []);

  if (!userData) {
    return <div className="profile-page">No profile data found.</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>{userData.role} Profile</h2>
        <p><strong>👤 Name:</strong> {userData.name}</p>
        <p><strong>📧 Email:</strong> {userData.email}</p>
        <p><strong>🏠 Address:</strong> {userData.address}</p>
        <p><strong>🪪 Wallet:</strong> {userData.wallet}</p>
        <p><strong>🔐 Role:</strong> {userData.role}</p>
      </div>
    </div>
  );
};

export default BuyerProfile;
