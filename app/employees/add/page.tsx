"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployeePage() {
  const router = useRouter();

  const [employee, setEmployee] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    position: "",
    employmentType: "Employee",
    status: "Active",
  });

  const handleChange = (field: string, value: string) => {
    setEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ New employee added!");
    router.push("/employees");
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>➕ Add New Employee</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        {["name", "address", "email", "phone", "position"].map((field) => (
          <label key={field} style={labelStyle}>
            {field[0].toUpperCase() + field.slice(1)}:
            <input
              type="text"
              value={employee[field as keyof typeof employee]}
              onChange={(e) => handleChange(field, e.target.value)}
              required={field === "name"}
              style={inputStyle}
            />
          </label>
        ))}

        <label style={labelStyle}>
          Employment Type:
          <select
            value={employee.employmentType}
            onChange={(e) => handleChange("employmentType", e.target.value)}
            style={inputStyle}
          >
            <option value="Employee">Employee</option>
            <option value="Contractor">Contractor</option>
            <option value="Subcontractor">Subcontractor</option>
          </select>
        </label>

        <label style={labelStyle}>
          Status:
          <select
            value={employee.status}
            onChange={(e) => handleChange("status", e.target.value)}
            style={inputStyle}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>

        <button type="submit" style={btnStyle}>✅ Save Employee</button>
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

const btnStyle = {
  padding: "0.7rem",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  marginTop: "1rem",
  cursor: "pointer"
};
