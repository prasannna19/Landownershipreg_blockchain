import React from "react";
import { ethers } from "ethers";

const MetaMaskTest = () => {
  const handleSign = async () => {
    try {
      if (!window.ethereum) {
        alert("❌ MetaMask not installed.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const message = `Test signature from: ${accounts[0]}`;
      const signature = await signer.signMessage(message);

      alert("✅ Signature success!");
      console.log("🖊️ Signature:", signature);
    } catch (err) {
      console.error("❌ Signature error:", err);
      alert("❌ Signature failed or canceled.");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>MetaMask Signature Test</h2>
      <button onClick={handleSign}>✍️ Sign a Test Message</button>
    </div>
  );
};

export default MetaMaskTest;
