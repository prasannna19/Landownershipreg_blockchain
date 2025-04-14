// src/pages/LandGallery.jsx
import React, { useEffect, useState } from "react";
import "../styles/LandGallery.css";

const LandGallery = () => {
  const [lands, setLands] = useState([]);
  const [requests, setRequests] = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const accs = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accs[0]);

      const storedLands = JSON.parse(localStorage.getItem("lands")) || [];
      const storedRequests = JSON.parse(localStorage.getItem("landRequests")) || [];

      setLands(storedLands);
      setRequests(storedRequests);
    };

    fetchData();
  }, []);

  const handleRequest = (landId) => {
    const newRequest = {
      landId,
      buyer: account,
      status: "Pending"
    };

    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem("landRequests", JSON.stringify(updatedRequests));
  };

  const getRequestStatus = (landId) => {
    const req = requests.find(r => r.landId === landId && r.buyer === account);
    return req ? req.status : "Not Requested";
  };

  return (
    <div className="buyer-section">
      <h2>🌍 Available Lands</h2>
      {lands.length === 0 ? (
        <p>No lands available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Area</th>
              <th>City</th>
              <th>State</th>
              <th>Price</th>
              <th>PID</th>
              <th>Survey</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {lands.map((land, index) => {
              const status = getRequestStatus(land.id);
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{land.area}</td>
                  <td>{land.city}</td>
                  <td>{land.state}</td>
                  <td>{land.price}</td>
                  <td>{land.propertyPID}</td>
                  <td>{land.surveyNumber}</td>
                  <td>
                    {status === "Not Requested" ? (
                      <button onClick={() => handleRequest(land.id)}>Request</button>
                    ) : (
                      <span>{status}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LandGallery;
