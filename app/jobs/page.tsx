"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/app/context/AppContext";

export default function JobsPage() {
  const { jobs, customers } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Jobs Management</h1>
      <p style={{ textAlign: "center" }}>Manage your jobs efficiently.</p>

      {/* ➕ Add New Job Button */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <Link href="/jobs/add">
          <button style={{ padding: "0.5rem 1rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            ➕ Add New Job
          </button>
        </Link>
      </div>

      {/* Search + Filter */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search by Quote Number, Job Name, or Customer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "1rem", width: "300px" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        >
          <option value="All">All</option>
          <option value="Quoted">Quoted</option>
          <option value="Accepted">Accepted</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* Jobs Table (EXCEL-STYLE) */}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
        fontSize: "0.95rem"
      }}>
        <thead style={{ backgroundColor: "#e0e0e0" }}>
          <tr>
            <th style={thStyle}>Quote #</th>
            <th style={thStyle}>Job Name</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Budget</th>
            <th style={thStyle}>Invoice Status</th>
            <th style={thStyle}>Invoice #</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => {
            const customerId = customers.find(c => c.name === job.customer)?.id;
            return (
              <tr key={job.id} style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}>
                <td style={tdStyle}>
                  <Link href={`/jobs/${job.id}`} style={linkStyle}>
                    {job.quoteNumber}
                  </Link>
                </td>
                <td style={tdStyle}>
                  <Link href={`/jobs/${job.id}`} style={linkStyle}>
                    {job.name}
                  </Link>
                </td>
                <td style={tdStyle}>
                  {customerId ? (
                    <Link href={`/customers/${customerId}`} style={linkStyle}>
                      {job.customer}
                    </Link>
                  ) : (
                    job.customer
                  )}
                </td>
                <td style={tdStyle}>{job.description}</td>
                <td style={tdStyle}>{job.status}</td>
                <td style={tdStyle}>${job.budget.toFixed(2)}</td>
                <td style={tdStyle}>{job.invoiceStatus}</td>
                <td style={tdStyle}>{job.invoiceNumber}</td>
              </tr>
            );
          })}
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
