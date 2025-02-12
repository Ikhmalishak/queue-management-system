import React from "react";

const Header = ({ username }) => {
    return (
      <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-primary text-white shadow-sm">
        {/* Left - Clinic Name */}
        <h4 className="m-0 d-flex align-items-center">
          <span className="me-2">🏥</span> SKP Clinic Admin
        </h4>
  
        {/* Right - User Info */}
        <div className="d-flex align-items-center">
          <span className="me-3 fw-bold">👤 {username}</span>
          <button className="btn btn-outline-light btn-sm px-3 rounded-pill">Logout</button>
        </div>
      </header>
    );
  };
  

export default Header;
