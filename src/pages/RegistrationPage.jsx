import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/RegistrationPage.css";

export default function RegistrationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    role: "buyer",
  });
  const [wallet, setWallet] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWallet(accounts[0]);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("MetaMask not found. Please install MetaMask extension.");
    }
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.address || !wallet) {
      alert("Please complete all fields and connect your wallet.");
      return;
    }

    const user = { ...form, wallet };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user)); // ✅ used across dashboards
    localStorage.setItem("registeredUser", JSON.stringify(user)); // optional backup

    alert("✅ Registration successful!");

    switch (form.role) {
      case "seller":
        navigate("/seller-dashboard");
        break;
      case "buyer":
        navigate("/buyer-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Register</h2>

        <div className="registration-wrapper">
          <div className="register-box">
            <h1 className="welcome-heading">🏡 Welcome to Land Ownership Registry</h1>
          </div>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleInputChange}
        />

        <select name="role" value={form.role} onChange={handleInputChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={connectWallet}>
          {wallet
            ? `🔗 Connected: ${wallet.substring(0, 6)}...${wallet.slice(-4)}`
            : "🔌 Connect Wallet"}
        </button>

        <button onClick={handleRegister}>✅ Register</button>
      </div>
    </div>
  );
}
