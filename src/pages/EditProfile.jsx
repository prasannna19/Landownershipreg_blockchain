import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(JSON.parse(localStorage.getItem("buyer")) || {});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    localStorage.setItem("buyer", JSON.stringify(data));
    alert("Profile updated!");
    navigate("/buyer-profile");
  };

  return (
    <div className="edit-profile">
      <h2>Buyer Profile</h2>
      <input value={data.wallet || ""} disabled />
      <input name="name" value={data.name || ""} onChange={handleChange} />
      <input name="age" value={data.age || ""} onChange={handleChange} />
      <input name="email" value={data.email || ""} onChange={handleChange} />
      <input name="city" value={data.city || ""} onChange={handleChange} />
      <input name="aadhar" value={data.aadhar || ""} onChange={handleChange} />
      <input name="pan" value={data.pan || ""} onChange={handleChange} />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditProfile;
