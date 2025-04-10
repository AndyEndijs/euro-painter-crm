"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// ✅ Extended Job + Customer types
export type Job = {
  id: string;
  quoteNumber: string;
  name: string;
  customer: string;
  description: string;
  status: string;
  budget: number;
  invoiceStatus: string;
  invoiceNumber: string;
};

export type Customer = {
  id: string;
  name: string;
  address?: string;
  email?: string;
  phone?: string;
};

type AppContextType = {
  jobs: Job[];
  customers: Customer[];
  addJob: (job: Job) => void;
  addCustomer: (customer: Customer) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      quoteNumber: "Q001",
      name: "Interior Painting",
      customer: "John Doe",
      description: "Living room and kitchen repainting.",
      status: "Active",
      budget: 1500,
      invoiceStatus: "Deposit",
      invoiceNumber: "INV001",
    },
    {
      id: "2",
      quoteNumber: "Q002",
      name: "Exterior Painting",
      customer: "Jane Smith",
      description: "House exterior and windows.",
      status: "Quoted",
      budget: 2500,
      invoiceStatus: "Progress",
      invoiceNumber: "INV002",
    },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Doe",
      address: "123 Main St",
      email: "john@example.com",
      phone: "555-1234",
    },
    {
      id: "2",
      name: "Jane Smith",
      address: "456 Oak St",
      email: "jane@example.com",
      phone: "555-5678",
    },
  ]);

  const addJob = (job: Job) => {
    setJobs((prev) => [...prev, job]);

    // Auto-add customer if not in list
    const customerExists = customers.find(
      (c) => c.name.toLowerCase() === job.customer.toLowerCase()
    );

    if (!customerExists) {
      const newCustomer: Customer = {
        id: (customers.length + 1).toString(),
        name: job.customer,
        address: "", // placeholder - can be captured from Add Job form later
        email: "",
        phone: "",
      };
      setCustomers((prev) => [...prev, newCustomer]);
    }
  };

  const addCustomer = (customer: Customer) => {
    if (!customers.find((c) => c.name.toLowerCase() === customer.name.toLowerCase())) {
      setCustomers((prev) => [...prev, customer]);
    }
  };

  return (
    <AppContext.Provider value={{ jobs, customers, addJob, addCustomer }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
