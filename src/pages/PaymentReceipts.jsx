import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "../styles/MakePayment.css";

const PaymentReceipts = () => {
  const [wallet, setWallet] = useState("");
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [filter, setFilter] = useState({
    seller: "",
    minAmount: "",
    maxAmount: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || !user.wallet) {
      alert("❌ Buyer not found. Please register and connect wallet.");
      return;
    }

    setWallet(user.wallet);

    const allReceipts = JSON.parse(localStorage.getItem("receipts")) || [];
    const myReceipts = allReceipts.filter(
      (r) => r.buyer?.toLowerCase() === user.wallet.toLowerCase()
    );

    setReceipts(myReceipts);
    setFilteredReceipts(myReceipts);
  }, []);

  const handleFilter = () => {
    const { seller, minAmount, maxAmount } = filter;

    const result = receipts.filter((r) => {
      const matchesSeller = seller ? r.seller.toLowerCase().includes(seller.toLowerCase()) : true;
      const matchesMin = minAmount ? parseFloat(r.amount) >= parseFloat(minAmount) : true;
      const matchesMax = maxAmount ? parseFloat(r.amount) <= parseFloat(maxAmount) : true;
      return matchesSeller && matchesMin && matchesMax;
    });

    setFilteredReceipts(result);
  };

  const downloadPDF = (receipt) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("🏡 Land Registry Payment Receipt", 20, 20);
    doc.setFontSize(12);
    doc.text(`🔗 TxHash: ${receipt.txHash}`, 20, 40);
    doc.text(`💰 Amount: ${receipt.amount} ETH`, 20, 50);
    doc.text(`👤 Buyer: ${receipt.buyer}`, 20, 60);
    doc.text(`🏠 Seller: ${receipt.seller}`, 20, 70);
    doc.text(`📅 Date: ${receipt.date}`, 20, 80);
    doc.text("✅ Status: Payment Completed", 20, 90);
    doc.save(`receipt_${receipt.txHash}.pdf`);
  };

  return (
    <div className="payment-container">
      <h2>🧾 Payment History</h2>

      <div className="filter-section" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Filter by seller address"
          value={filter.seller}
          onChange={(e) => setFilter({ ...filter, seller: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Amount"
          value={filter.minAmount}
          onChange={(e) => setFilter({ ...filter, minAmount: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Amount"
          value={filter.maxAmount}
          onChange={(e) => setFilter({ ...filter, maxAmount: e.target.value })}
        />
        <button onClick={handleFilter}>🔎 Apply Filter</button>
      </div>

      {filteredReceipts.length === 0 ? (
        <p>You have no matching receipts.</p>
      ) : (
        filteredReceipts.map((receipt, index) => (
          <div key={index} className="land-card">
            <p><strong>🔗 TxHash:</strong> {receipt.txHash}</p>
            <p><strong>💰 Amount:</strong> {receipt.amount} ETH</p>
            <p><strong>👤 Buyer:</strong> {receipt.buyer}</p>
            <p><strong>🏠 Seller:</strong> {receipt.seller}</p>
            <p><strong>📅 Date:</strong> {receipt.date}</p>
            <p style={{ color: "green", fontWeight: "bold" }}>✅ Payment Completed</p>
            <button onClick={() => downloadPDF(receipt)}>⬇️ Download PDF</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PaymentReceipts;
