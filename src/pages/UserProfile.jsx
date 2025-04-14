import React, { useEffect, useState } from "react";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (current) {
      setUser(current);
    }
  }, []);

  return (
    <div className="user-profile">
      <h2>👤 My Profile</h2>
      {user ? (
        <div className="profile-box">
          <p><strong>Name:</strong> {user.name || "N/A"}</p>
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <p><strong>Role:</strong> {user.role || "N/A"}</p>
          <p><strong>Address:</strong> {user.address || "N/A"}</p>
          <p><strong>Wallet:</strong> {user.wallet || "N/A"}</p>
        </div>
      ) : (
        <p>❌ No user found. Please register or reconnect.</p>
      )}
    </div>
  );
};

export default UserProfile;
