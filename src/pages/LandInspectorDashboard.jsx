import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../smartcontracts/abi.json';

const contractAddress = '0x71D95a32Db4f96CBCD297bb1F9Df08d4E5548117';

function LandInspectorDashboard() {
  const [requests, setRequests] = useState([]);
  const [lands, setLands] = useState([]);
  const [approvingIndex, setApprovingIndex] = useState(null);

  const getAllRequests = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const allRequests = await contract.getAllRequests();
      setRequests(allRequests);
    } catch (err) {
      console.error("Error fetching requests:", err);
      alert("❌ Failed to load requests");
    }
  };

  const getAllLands = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const allLands = await contract.getAllLands();
      setLands(allLands);
    } catch (err) {
      console.error("Error fetching lands:", err);
    }
  };

  const handleApprove = async (index) => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask!");

      setApprovingIndex(index);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.approveRequest(index);
      await tx.wait();

      alert("✅ Land request approved");
      getAllRequests();
    } catch (err) {
      console.error("❌ Approval failed:", err?.info?.error?.message || err.message);
      alert("❌ Approval failed");
    } finally {
      setApprovingIndex(null);
    }
  };

  useEffect(() => {
    getAllRequests();
    getAllLands();
  }, []);

  return (
    <div style={{ backgroundColor: '#e7f4ff', padding: '2rem', minHeight: '100vh' }}>
      <h2>🧑‍⚖️ Land Inspector Dashboard - Approve Land Requests</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          requests.map((req, index) => {
            const land = lands[req.landIndex];
            return (
              <div key={index} style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '1rem',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                width: '280px'
              }}>
                <h4>{land?.title || 'Unknown Land'}</h4>
                <p>Buyer: {req.buyer}</p>
                <p>Status: {req.approved ? '✅ Approved' : '⏳ Pending'}</p>
                <p>Paid: {req.paid ? '✅ Yes' : '❌ No'}</p>

                {!req.approved && (
                  <button
                    onClick={() => handleApprove(index)}
                    disabled={approvingIndex === index}
                    style={{
                      marginTop: '10px',
                      backgroundColor: '#90caf9',
                      border: 'none',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    {approvingIndex === index ? 'Approving...' : 'Approve Request'}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default LandInspectorDashboard;
