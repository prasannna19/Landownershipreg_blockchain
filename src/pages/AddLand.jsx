import React, { useState } from "react";
import "../styles/AddLand.css";

const AddLand = () => {
  const [form, setForm] = useState({
    title: "",
    city: "",
    state: "",
    price: "",
    document: "",
    image: "",
  });

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
      // 🟡 Connect and confirm wallet
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const wallet = accounts[0];

      const message = `Confirm to add land titled "${form.title}" priced at ${form.price} ETH.`;
      await window.ethereum.request({
        method: "personal_sign",
        params: [message, wallet],
      });

      // 🟢 If signature successful, proceed
      const newLand = {
        id: Date.now(),
        ...form,
        owner: wallet,
        status: "Not Approved",
        requestStatus: null,
        buyer: null,
      };

      const lands = JSON.parse(localStorage.getItem("lands")) || [];
      lands.push(newLand);
      localStorage.setItem("lands", JSON.stringify(lands));

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
      console.error("Signature failed or cancelled:", err);
      alert("❌ MetaMask signature was cancelled. Land not added.");
    }
  };

  return (
    <div className="add-land-container">
      <h2>📝 Add New Land</h2>
      <input name="title" placeholder="Land Title" value={form.title} onChange={handleChange} />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
      <input name="price" placeholder="Price in ETH" value={form.price} onChange={handleChange} />
      <input name="document" placeholder="Document PDF URL" value={form.document} onChange={handleChange} />
      <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
      <button onClick={handleAddLand}>➕ Add Land</button>
    </div>
  );
};

export default AddLand;
