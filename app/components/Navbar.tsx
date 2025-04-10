"use client";
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar(): JSX.Element {
  return (
    <nav
      style={{
        padding: "1rem",
        backgroundColor: "#333",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/">
          <Image 
            src="/images/europainters-logo.png" 
            alt="EuroPainters Logo" 
            width={120} 
            height={60} 
            style={{ cursor: "pointer" }}
          />
        </Link>
        <ul style={{ display: "flex", gap: "1.5rem", listStyle: "none" }}>
          {['Home', 'Jobs', 'Employees', 'Customers', 'Payroll', 'Settings'].map((page) => (
            <li key={page}>
              <Link 
                href={page === 'Home' ? '/' : `/${page.toLowerCase()}`} 
                style={{ color: "#fff", textDecoration: "none" }}
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
