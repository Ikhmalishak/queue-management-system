import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = {
    admin: [
      { name: "Dashboard", icon: "📊", path: "/admin/dashboard" },
      { name: "Manage Employee", icon: "👥", path: "/admin/employees" },
      { name: "Manage Doctor", icon: "📅", path: "/admin/doctors" },
      { name: "Manage Medicine", icon: "📈", path: "/admin/medicines" },
      { name: "Manage Diagnoses", icon: "📈", path: "/admin/diagnoses" },
      // { name: "Reports", icon: "📈", path: "/admin/reports" },
    ],
  };

  return (
    <div
      className={`sidebar bg-dark text-white d-flex flex-column ${isExpanded ? "expanded" : "collapsed"}`}
      style={{
        minHeight: "100vh",
        width: isExpanded ? "250px" : "60px",
        transition: "width 0.3s ease-in-out",
        boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
      }}
    >
      {/* Toggle Button */}
      <div className="p-3 d-flex justify-content-center">
        <button
          className="btn btn-outline-light btn-sm rounded-circle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "◄" : "►"}
        </button>
      </div>

      {/* Sidebar Menu */}
      <Nav className="flex-column px-2">
        {menuItems[role].map((item, index) => (
          <Nav.Link
            as={Link}
            to={item.path}
            key={index}
            className="text-white mb-2 d-flex align-items-center px-2 py-2 rounded"
          >
            <span className="me-2">{item.icon}</span>
            {isExpanded && <span>{item.name}</span>}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
