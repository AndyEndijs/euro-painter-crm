"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";

export default function AddCustomerPage() {
  const { addCustomer, customers } = useAppContext();
  const router = useRouter();

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleChange = (field: string, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const alreadyExists = customers.find(
      (c) => c.name.toLowerCase() === customer.name.toLowerCase()
    );
    if (alreadyExists) {
      alert("⚠️ Customer already exists!");
      return;
    }

    addCustomer({
      id: (customers.length + 1).toString(),
      ...customer,
    });

    alert("✅ Customer added!");
    router.push("/customers");
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>➕ Add New Customer</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <label style={labelStyle}>
          Name:
          <input
            type="text"
            value={customer.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Address:
          <input
            type="text"
            value={customer.address}
            onChange={(e) => handleChange("address", e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Email:
          <input
            type="email"
            value={customer.email}
            onChange={(e) => handleChange("email", e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Phone:
          <input
            type="text"
            value={customer.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            style={inputStyle}
          />
        </label>

        <button type="submit" style={buttonStyle}>✅ Save Customer</button>
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

const buttonStyle = {
  padding: "0.7rem",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "1rem"
};
