import React, { useState } from "react";

const TableComponent = ({ columns, data = [], onEdit, onDelete, onAdd, onImport, title }) => {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // 🔍 Filter Data
  const filteredData = data.filter((item) =>
    columns.some((col) => (item[col.key]?.toString().toLowerCase() || "").includes(search.toLowerCase()))
  );

  // 📊 Sorting Logic
  const handleSort = (colKey) => {
    setSortOrder(sortColumn === colKey && sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(colKey);
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn]?.toString().toLowerCase() || "";
    const valB = b[sortColumn]?.toString().toLowerCase() || "";
    return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  return (
    <div>
      {/* Page Title & Search/Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{title}</h2>
        <div className="d-flex align-items-center gap-2">
          {/* Search Input */}
          <input
            type="text"
            className="form-control"
            style={{ width: "250px" }}
            placeholder={`🔍 Search ${title}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* 📂 Import Button */}
          {onImport && (
            <label className="btn btn-secondary m-0">
              📂 Import From Excel
              <input type="file" accept=".xlsx, .xls" onChange={onImport} hidden />
            </label>
          )}

          {/* ➕ Add Button */}
          {onAdd && <button className="btn btn-success" onClick={onAdd}>➕ Add {title}</button>}
        </div>
      </div>

      {/* 📊 Data Table */}
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            {columns.map((col) => (
              <th key={col.key} onClick={() => handleSort(col.key)} style={{ cursor: "pointer" }}>
                {col.label} {sortColumn === col.key ? (sortOrder === "asc" ? "🔼" : "🔽") : ""}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                {columns.map((col) => (
                  <td key={col.key}>{item[col.key] || "N/A"}</td>
                ))}
                <td>
                  {onEdit && <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(item)}>✏️ Edit</button>}
                  {onDelete && <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.id)}>🗑️ Delete</button>}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 2} className="text-center text-muted">No {title} found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
