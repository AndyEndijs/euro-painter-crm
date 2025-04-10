"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/app/context/AppContext";

type Customer = {
  id: string;
  name: string;
  address?: string;
  email?: string;
  phone?: string;
};

export default function CustomersPage() {
  const { customers } = useAppContext();
  const [search, setSearch] = useState("");

  const filtered = customers.filter((c) =>
    `${c.name} ${c.address || ""} ${c.email || ""} ${c.phone || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Customer Management</h1>

      {/* 🔘 Search & Add Button Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search by name, address, email, or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <Link href="/customers/add">
          <button style={addBtnStyle}>➕ Add Customer</button>
        </Link>
      </div>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
        fontSize: "0.95rem"
      }}>
        <thead style={{ backgroundColor: "#e0e0e0" }}>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id} style={{ textAlign: "center", borderBottom: "1px solid #ccc" }}>
              <td style={tdStyle}>
                <Link href={`/customers/${c.id}`} style={linkStyle}>{c.name}</Link>
              </td>
              <td style={tdStyle}>{c.address || "-"}</td>
              <td style={tdStyle}>{c.email || "-"}</td>
              <td style={tdStyle}>{c.phone || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

const thStyle = {
  padding: "0.75rem",
  border: "1px solid #ccc",
  fontWeight: "bold" as const,
  backgroundColor: "#f0f0f0"
};

const tdStyle = {
  padding: "0.6rem",
  border: "1px solid #ccc"
};

const linkStyle = {
  color: "blue",
  textDecoration: "underline",
  cursor: "pointer"
};

const addBtnStyle = {
  padding: "0.6rem 1rem",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontWeight: "bold" as const,
  fontSize: "0.9rem",
  cursor: "pointer"
};
