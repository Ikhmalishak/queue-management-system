import React from "react";

const StatCard = ({ title, value, backgroundColor, icon }) => {
  return (
    <div
      className={`p-4 rounded text-white d-flex flex-column justify-content-between align-items-start ${backgroundColor}`}
      style={{
        minHeight: "120px", // Ensure all cards have the same height
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
      }}
    >
      <div className="d-flex justify-content-between w-100">
        <h3 className="fw-bold mb-2" style={{ fontSize: "28px" }}>{value}</h3>
        <div className="fs-1 opacity-75">{icon}</div>
      </div>
      <p className="small m-0" style={{ fontSize: "16px", whiteSpace: "nowrap" }}>{title}</p>
    </div>
  );
};

export default StatCard;
