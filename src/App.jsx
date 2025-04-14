import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import RegistrationPage from "./pages/RegistrationPage";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddLand from "./pages/AddLand";
import ApproveRequests from "./pages/ApproveRequests";
import MakePayment from "./pages/MakePayment";
import OwnedLands from "./pages/OwnedLands";
import ViewLands from "./pages/ViewLands";
import TransferOwnership from "./pages/TransferOwnership";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import Help from "./pages/Help";
import MetaMaskTest from "./pages/MetaMaskTest"; // ✅ Make sure this file exists!
import VerifyBuyers from "./pages/VerifyBuyers";
import VerifySellers from "./pages/VerifySellers";

import ApproveTransfers from "./pages/ApproveTransfers";



import PaymentReceipts from "./pages/PaymentReceipts";






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/payment-receipts" element={<PaymentReceipts />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/verify-buyers" element={<VerifyBuyers />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/approve-transfers" element={<ApproveTransfers />} />
        <Route path="/verify-sellers" element={<VerifySellers />} />
        <Route path="/add-land" element={<AddLand />} />
        <Route path="/approve-requests" element={<ApproveRequests />} />
        <Route path="/view-lands" element={<ViewLands />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/owned-lands" element={<OwnedLands />} />
        
        <Route path="/transfer-ownership" element={<TransferOwnership />} />
        <Route path="/my-profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/help" element={<Help />} />

        <Route path="/test-metamask" element={<MetaMaskTest />} /> {/* ✅ Test route */}
      </Routes>
    </Router>
  );
}

export default App;
