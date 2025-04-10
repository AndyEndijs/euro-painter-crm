"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";

export default function AddJobPage() {
  const { addJob, customers } = useAppContext();
  const router = useRouter();

  const [job, setJob] = useState({
    quoteNumber: "",
    name: "",
    customer: "",
    customerAddress: "",
    customerEmail: "",
    customerPhone: "",
    description: "",
    status: "Quoted",
    budget: "",
    invoiceStatus: "Pending",
    invoiceNumber: "",
  });

  const handleChange = (field: string, value: string) => {
    setJob((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob = {
      id: Date.now().toString(),
      quoteNumber: job.quoteNumber,
      name: job.name,
      customer: job.customer,
      description: job.description,
      status: job.status,
      budget: Number(job.budget),
      invoiceStatus: job.invoiceStatus,
      invoiceNumber: job.invoiceNumber,
    };

    addJob(newJob);

    // Only add new customer if doesn't exist
    const alreadyExists = customers.find(
      (c) => c.name.toLowerCase() === job.customer.toLowerCase()
    );

    if (!alreadyExists) {
      const newCustomer = {
        id: (customers.length + 1).toString(),
        name: job.customer,
        address: job.customerAddress,
        email: job.customerEmail,
        phone: job.customerPhone,
      };
      // Inject to context manually
      customers.push(newCustomer);
    }

    alert(`✅ Job "${newJob.name}" added.`);
    router.push("/jobs");
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>➕ Add New Job</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <label style={labelStyle}>
          Quote Number:
          <input type="text" value={job.quoteNumber} onChange={(e) => handleChange("quoteNumber", e.target.value)} required style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Job Name:
          <input type="text" value={job.name} onChange={(e) => handleChange("name", e.target.value)} required style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Customer Name:
          <input type="text" value={job.customer} onChange={(e) => handleChange("customer", e.target.value)} required style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Customer Address:
          <input type="text" value={job.customerAddress} onChange={(e) => handleChange("customerAddress", e.target.value)} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Customer Email:
          <input type="email" value={job.customerEmail} onChange={(e) => handleChange("customerEmail", e.target.value)} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Customer Phone:
          <input type="text" value={job.customerPhone} onChange={(e) => handleChange("customerPhone", e.target.value)} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Description:
          <textarea value={job.description} onChange={(e) => handleChange("description", e.target.value)} rows={3} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Status:
          <select value={job.status} onChange={(e) => handleChange("status", e.target.value)} style={inputStyle}>
            <option value="Quoted">Quoted</option>
            <option value="Accepted">Accepted</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>
        </label>

        <label style={labelStyle}>
          Budget:
          <input type="number" value={job.budget} onChange={(e) => handleChange("budget", e.target.value)} style={inputStyle} />
        </label>

        <label style={labelStyle}>
          Invoice Status:
          <select value={job.invoiceStatus} onChange={(e) => handleChange("invoiceStatus", e.target.value)} style={inputStyle}>
            <option value="Pending">Pending</option>
            <option value="Deposit">Deposit</option>
            <option value="Progress">Progress</option>
            <option value="Final">Final</option>
          </select>
        </label>

        <label style={labelStyle}>
          Invoice Number:
          <input type="text" value={job.invoiceNumber} onChange={(e) => handleChange("invoiceNumber", e.target.value)} style={inputStyle} />
        </label>

        <button type="submit" style={{
          padding: "0.7rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          marginTop: "1rem",
          cursor: "pointer"
        }}>
          ✅ Save Job
        </button>
      </form>
    </main>
  );
}

const inputStyle = {
  padding: "0.6rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: "100%",
  fontSize: "0.95rem"
};

const labelStyle = {
  display: "flex",
  flexDirection: "column" as const,
  fontWeight: "bold",
  fontSize: "0.9rem"
};
