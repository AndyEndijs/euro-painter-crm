"use client";
import { useState } from "react";
import Link from "next/link";

type Employee = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  position: string;
  employmentType: string;
  status: string;
};

const dummyEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    address: "123 Main St",
    email: "john@example.com",
    phone: "555-1234",
    position: "Painter",
    employmentType: "Employee",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    address: "456 Oak St",
    email: "jane@example.com",
    phone: "555-5678",
    position: "Supervisor",
    employmentType: "Contractor",
    status: "Inactive",
  },
];

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = employees.filter((e) =>
    `${e.name} ${e.address} ${e.email} ${e.phone}`
      .toLowerCase()
      .includes(search.toLowerCase()) &&
    (statusFilter === "" || e.status === statusFilter)
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Employee Management</h1>

      {/* 🔍 Search + Filter + Add */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem"
      }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={inputStyle}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <Link href="/employees/add">
          <button style={addBtnStyle}>➕ Add Employee</button>
        </Link>
      </div>

      {/* 📄 Table */}
      <table style={tableStyle}>
        <thead style={{ backgroundColor: "#e0e0e0" }}>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Address</th>
            <th style={th}>Email</th>
            <th style={th}>Phone</th>
            <th style={th}>Position</th>
            <th style={th}>Type</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => (
            <tr key={e.id} style={{ textAlign: "center" }}>
              <td style={td}>
                <a href={`/employees/${e.id}`} style={{ color: "blue", textDecoration: "underline" }}>
                  {e.name}
                </a>
              </td>
              <td style={td}>{e.address}</td>
              <td style={td}>{e.email}</td>
              <td style={td}>{e.phone}</td>
              <td style={td}>{e.position}</td>
              <td style={td}>{e.employmentType}</td>
              <td style={td}>{e.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

const inputStyle = {
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "0.9rem",
  marginRight: "1rem",
};

const addBtnStyle = {
  backgroundColor: "#0070f3",
  color: "#fff",
  padding: "0.6rem 1rem",
  border: "none",
  borderRadius: "4px",
  fontWeight: "bold" as const,
  fontSize: "0.9rem",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "1rem",
};

const th = {
  padding: "0.75rem",
  border: "1px solid #ccc",
  fontWeight: "bold" as const,
  backgroundColor: "#f0f0f0",
};

const td = {
  padding: "0.6rem",
  border: "1px solid #ccc",
};
