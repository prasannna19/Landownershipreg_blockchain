import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SellerDashboard.css";

const SellerDashboard = () => {
  const [form, setForm] = useState({
    title: "",
    city: "",
    state: "",
    price: "",
    document: "",
    image: "",
  });

  const [lands, setLands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "seller") {
      alert("❌ You must be a registered seller to view this page.");
      navigate("/");
    } else {
      const all = JSON.parse(localStorage.getItem("lands")) || [];
      const myLands = all.filter((land) => land.owner === user.wallet);
      setLands(myLands);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddLand = async () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "seller") {
      alert("❌ Only registered sellers can add land.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const wallet = accounts[0];

      const message = `Please sign to confirm adding land titled "${form.title}" for ${form.price} ETH`;
      await window.ethereum.request({
        method: "personal_sign",
        params: [message, wallet],
      });

      const newLand = {
        id: Date.now(),
        ...form,
        owner: wallet,
        status: "Not Approved",
        requestStatus: null,
        buyer: null,
      };

      const allLands = JSON.parse(localStorage.getItem("lands")) || [];
      allLands.push(newLand);
      localStorage.setItem("lands", JSON.stringify(allLands));

      const myLands = allLands.filter((land) => land.owner === wallet);
      setLands(myLands);

      alert("✅ Land added successfully!");
      setForm({
        title: "",
        city: "",
        state: "",
        price: "",
        document: "",
        image: "",
      });
    } catch (err) {
      console.error("Signature failed:", err);
      alert("❌ Signature rejected. Land not added.");
    }
  };

  return (
    <div className="seller-dashboard">
      <h2>🏠 Seller Dashboard</h2>

      <div className="nav-buttons">
        <button onClick={() => navigate("/view-lands")}>🌍 View All Lands</button>
        <button onClick={() => navigate("/approve-requests")}>✅ Approve Requests</button>
        <button onClick={() => navigate("/my-profile")}>👤 My Profile</button>
      </div>

      <div className="add-land-vertical">
        <h3>➕ Add New Land</h3>
        <input name="title" placeholder="Land Title" value={form.title} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
        <input name="price" placeholder="Price in ETH" value={form.price} onChange={handleChange} />
        <input name="document" placeholder="Document PDF URL" value={form.document} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <button onClick={handleAddLand}>➕ Add Land</button>
      </div>

      <h3>📑 Your Added Lands</h3>
      {lands.length === 0 ? (
        <p>You haven't added any lands yet.</p>
      ) : (
        lands.map((land) => (
          <div key={land.id} className="land-card">
            <p>📍 <strong>Location:</strong> {land.city}, {land.state}</p>
            <p>💰 <strong>Price:</strong> {land.price} ETH</p>
            <p><strong>{land.title}</strong></p>
            <p>📄 <a href={land.document} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <p>Status: {land.status === "Approved" ? "✅ Approved" : "❌ Not Approved"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerDashboard;
